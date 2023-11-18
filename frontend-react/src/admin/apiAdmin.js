export const createCategory = (userId, token, category) => {
  return fetch(`${process.env.REACT_APP_API_URL}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  return fetch(`${process.env.REACT_APP_API_URL}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//method to get all the categories from database
export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/category`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Method to get all the orders
export const listOrders = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Method to get status of the orders
export const getStatusValues = (userId, token) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/order/status-values/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Method to update status of order
export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/order/${orderId}/status/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// To get all the products
export const getProducts = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/products?limit=100`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// To get a single product
export const getProduct = (productId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// Update single product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete single product
export const deleteProduct = (productId, userId, token) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
