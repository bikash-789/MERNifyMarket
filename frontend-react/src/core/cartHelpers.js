export const addItem = (item, next) => {
    console.log('Adding item to cart');
  
    // Check if window and localStorage are defined
    if (typeof window !== 'undefined' && localStorage) {
      // Retrieve cart from localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Check if the item is already in the cart
      const existingItem = cart.find((p) => p._id === item._id);
  
      if (existingItem) {
        // If the item is already in the cart, increase the count
        existingItem.count += 1;
      } else {
        // If the item is not in the cart, add it with a count of 1
        cart.push({ ...item, count: 1 });
      }
  
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Execute the callback function if provided
      if (next) {
        next();
      }
    }
  };
  
export const itemTotal = ()=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
}

export const getCart = ()=>{
    if(typeof window !== "undefined")
    {
        if(localStorage.getItem("cart"))
        {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
}


// update the product count quantity in cart
export const updateItem = (productId, count)=>{
    let cart = [];
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i)=>{
            if(product._id === productId){
                cart[i].count = count;
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

// remove function to remove the product count quantity in cart
export const removeItem = (productId)=>{
    let cart = [];
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i)=>{
            if(product._id === productId){
                cart.splice(i, 1);
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart;
}


// Empty cart from localstorage after successful payment
export const emptyCart = next =>{
    if(typeof window !== 'undefined')
    {
        localStorage.removeItem("cart");
        next();
    }
}