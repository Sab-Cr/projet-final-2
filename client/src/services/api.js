export const getProduct = async (productId) => {
  const res = await fetch(`/ecommercewatch/products/${productId}`);
  return await res.json();
};