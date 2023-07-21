export const getProducts = async () => {
  const res = await fetch(`/ecommercewatch/products`);
  return await res.json();
};

export const getProduct = async (productId) => {
  const res = await fetch(`/ecommercewatch/products/${productId}`);
  return await res.json();
};

export const addToCart = async (body) => {
  const res = await fetch("/ecommercewatch/additemcart", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return await res.json();
};