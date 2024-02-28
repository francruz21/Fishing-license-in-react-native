import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const { userPhotoURL, userName, userLastName } = route.params;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [imageURI, setImageURI] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const newMessages = [];
        querySnapshot.forEach(doc => {
          newMessages.push(doc.data());
        });
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, []);

  const imagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };



  launchImageLibrary(options, (response) => {
    if (response.assets && response.assets.length > 0) {
      setImageURI(response.assets[0].uri);
      console.log(response);
    }
  });
};





  const uploadImage = async () => {
    try {
      if (!imageURI) {
        console.log('Please select an image first.');
        return;
      }

      const currentUser = auth().currentUser;
      const imageRef = storage().ref('images/' + Math.random().toString(36).substring(7)); 
      // Ruta de almacenamiento en Firebase Storage
      await imageRef.putFile(imageURI);
      const imageUrl = await imageRef.getDownloadURL();

      await firestore().collection('messages').add({
        text: newMessage,
        createdAt: new Date().toISOString(),
        uid: currentUser.uid,
        displayName: userName + " " + userLastName,
        photoURL: userPhotoURL,
        imageUrl: imageUrl,
      });

      setNewMessage('');
      setImageURI(null);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  const sendMessage = async () => {
    try {
      if (newMessage || imageURI) {
        if (imageURI) {
          await uploadImage();
        } else {
          const currentUser = auth().currentUser;
          await firestore().collection('messages').add({
            text: newMessage,
            createdAt: new Date().toISOString(),
            uid: currentUser.uid,
            displayName: userName + " " + userLastName,
            photoURL: userPhotoURL,
          });
          setNewMessage('');
        }
      }
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <View style={styles.userInfo}>
              {item.photoURL && <Image source={{ uri: item.photoURL }} style={styles.userPhoto} />}
              <Text style={styles.displayName}>{item.displayName}</Text>
            </View>
            {item.text && <Text>{item.text}</Text>}
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.messageImage} />}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          placeholder="Type your message..."
        />
        <Button title="Select Image" onPress={imagePicker} />
        <Button title="Send" onPress={sendMessage} />
      </View>
      {imageURI && <Image source={{ uri: imageURI }} style={styles.selectedImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageList: {
    flex: 1,
    width: '100%',
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  displayName: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  messageImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default ChatScreen;
