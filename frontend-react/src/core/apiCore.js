import queryString from "query-string";

// READ - based on filters (new arrival)
export const getProducts = (sortBy) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=6`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//READ - all categories
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

// READ - based on filters
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// SEARCH method
export const list = (params) => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`${process.env.REACT_APP_API_URL}/products/search?${query}`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// READ method
export const read = (productId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


//READ - all related products
export const listRelated = (productId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/products/related/${productId}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};



// GET client Token from Braintree
export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const processPayment = (userId, token, paymentData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


// create and save the order into database
export const createOrder = (userId, token, createOrderData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({order: createOrderData})
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
