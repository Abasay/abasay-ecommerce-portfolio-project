export const uploadToCart = async (
  email,
  name,
  category,
  productImg,
  price,
  description,
  prod_id
) => {
  const request = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/upload-to-cart`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        category,
        productImg,
        price,
        description,
        prod_id,
      }),
    }
  );

  const response = await request.json();
  console.log(response);

  return response;
};
