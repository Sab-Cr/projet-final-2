export const getProducts = async () => {
  const res = await fetch(`/ecommercewatch/products`);
  return await res.json();
};

export const getProduct = async (productId) => {
  const res = await fetch(`/ecommercewatch/products/${productId}`);
  return await res.json();
};
