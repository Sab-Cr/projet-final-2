/*export const getProducts = async (start, limit, category) => {
  const res = await fetch(`/ecommercewatch/products?start=${start}&limit=${limit}${!category || category === "All"? "" : "&category="+category}`);
  return await res.json();
};

export const getProduct = async (productId) => {
  const res = await fetch(`/ecommercewatch/products/${productId}`);
  return await res.json();
};

export const getCart = async () => {
  const res = await fetch("/ecommercewatch/getallitemscart");
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

export const deleteCartItem = async (itemId) => {
  const res = await fetch(`/ecommercewatch/deleteitemcart/${itemId}`, {
    method: "DELETE"
  });
  return await res.json();
};

export const deleteCartItems = async () => {
  const res = await fetch(`/ecommercewatch/deleteitemscart`, {
    method: "DELETE"
  });
   return await res.json();
};

export const updateCart = async (itemId, quantity) => {
  const res = await fetch(`/ecommercewatch/quantityitem/${itemId}/${quantity}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  return res.json();
}

export const updateQuantity = async (itemId, quantity) => {
  const res = await fetch(`/ecommercewatch/updatequantity/${itemId}/${quantity}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  return res.json();
}

export const getCategories = async () => {
  const res = await fetch(`/ecommercewatch/categorie`);
  return await res.json();
}*/