import axios from "axios";
import Cookies from "js-cookie";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export async function getProducts({ id }) {
  let url = "https://ecommerce.routemisr.com/api/v1/products";
  if (id) {
    url += "/" + id;
  }

  const response = await axios.get(url);

  if (response.status === null) {
    const error = new Error("An error occurred while fetching the products");
    error.code = response.status;
    throw error;
  }
  const { data } = response;

  return data.data;
}

export async function getLoggedUserCart() {
  const response = await axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: Cookies.get("token") },
    })
    .catch((err) => {
      const error = new Error("An error occurred while fetching the cart");
      error.code = err.response.status;
      throw error;
    });

  if (response.status === undefined) {
    const error = new Error("An error occurred while fetching the cart");
    error.code = response.status;
    throw error;
  }

  const { data } = response;

  return data.data;
}

export async function deleteProduct({ id }) {
  let url = "https://ecommerce.routemisr.com/api/v1/cart";
  if (id) {
    url += "/" + id;
  }
  const response = await axios.delete(url, {
    headers: { token: Cookies.get("token") },
  });

  if (response.status === null) {
    const error = new Error(
      "An error occurred while deleting the cart product"
    );
    error.code = response.status;
    throw error;
  }

  const { data } = response;

  return data.data;
}

export async function updateProduct({ id, count }) {
  const response = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    {
      headers: { token: Cookies.get("token") },
    }
  );

  if (response.status === null) {
    const error = new Error(
      "An error occurred while deleting the cart product"
    );
    error.code = response.status;
    throw error;
  }

  const { data } = response;

  return data.data;
}

export async function getCategories() {
  const response = await axios
    .get("https://ecommerce.routemisr.com/api/v1/categories")
    .catch((err) => {
      const error = new Error("An error occurred while fetching the categories");
      error.code = err.response.status;
      throw error;
    });

  if (response.status === undefined) {
    const error = new Error("An error occurred while fetching the cart");
    error.code = response.status;
    throw error;
  }

  const { data } = response;

  return data.data;
}

export async function getBrands() {
  const response = await axios
    .get("https://ecommerce.routemisr.com/api/v1/brands")
    .catch((err) => {
      const error = new Error(
        "An error occurred while fetching the categories"
      );
      error.code = err.response.status;
      throw error;
    });

  if (response.status === undefined) {
    const error = new Error("An error occurred while fetching the cart");
    error.code = response.status;
    throw error;
  }

  const { data } = response;

  return data.data;
}

export async function getLoggedUserWishList() {
  const response = await axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: Cookies.get("token") },
    })
    .catch((err) => {
      const error = new Error("An error occurred while fetching the cart");
      error.code = err.response.status;
      throw error;
    });

  if (response.status === undefined) {
    const error = new Error("An error occurred while fetching the cart");
    error.code = response.status;
    throw error;
  }

  const { data } = response;

  return data.data;
}

export async function deleteProductFromWishList({ id }) {
  const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    headers: { token: Cookies.get("token") },
  });

  if (response.status === null) {
    const error = new Error(
      "An error occurred while deleting the wishList product"
    );
    error.code = response.status;
    throw error;
  }

  const { data } = response;

  return data.data;
}

