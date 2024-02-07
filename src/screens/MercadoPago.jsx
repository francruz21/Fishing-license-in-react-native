import { ACCESS_TOKEN } from "../../Config.json";

export const HandleItegrantionMp = async () => {
  const preferencia = {
    "items": [
      {
        "title": "Carnet Anual",
        "description": "carnet anual de pesca",
        "picture_url": "https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg",
        "category_id": "car_electronics",
        "quantity": 1,
        "currency_id": "$",
        "unit_price": 10
      }
    ]
  };

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferencia)
    });

    const data = await response.json();
    return data.init_point; // Devuelve el init_point
  } catch (error) {
    console.log(error);
    return null; // Devuelve null en caso de error
  }
};
