import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {isAuthenticated} from '../auth/index.js';
import { createOrder, getBraintreeClientToken } from "./apiCore.js";
import DropIn from 'braintree-web-drop-in-react';
import { processPayment } from "./apiCore.js";
import { emptyCart } from "./cartHelpers.js";

const Checkout = ({products, cartModificationCallback})=>{
    const [data, setData] = useState({
        success: false,
        loading: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const bearerToken = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token)=>{
        getBraintreeClientToken(userId, token).then(data=>{
            if(data.error)
            {
                setData({...data, error: data.error});
            }
            else{
                setData({clientToken: data.clientToken});
            }
        })
    }

    useEffect(()=>{
        getToken(userId, bearerToken);
    }, []);


    const getTotal = ()=>{
        const initialValue = 0;
        return products.reduce((totalValue, currentValue)=>
            totalValue + currentValue.count * currentValue.price, initialValue
        )
    }
    const showCheckout = () => {
        return isAuthenticated() ? (
        <div>{showDropIn()}</div>
        ) : (
        <Link to="/signin">
            <button className="btn btn-primary">Sign in to checkout</button>
        </Link>
        )
    };
    const buy = ()=>{
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data=>{
            console.log(data)
            nonce = data.nonce

            // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
            // and also total to be charged
            // console.log('Send nonce and total to process: ', nonce, getTotal(products))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, bearerToken, paymentData)
            .then(response=>{
                // console.log(response)
                const createOrderData = {
                    products: products,
                    transaction_id: response.transaction_id,
                    amount: response.transaction.amount,
                    address: data.address
                }
                // create order
                createOrder(userId, bearerToken, createOrderData)
                .then(response=>{
                    emptyCart(()=>{
                        console.log("Payment success and empty cart");
                        cartModificationCallback(); 
                        setData({
                            loading: false,
                            success: true
                        })
                    })
                })
            })
            .catch((error)=>console.log(error));
        })
        .catch(error=>{
            console.log('Dropin error: ', error);
            setData({...data, error: error.message})
        })
    }
    const handleAddress = event=>{
        setData({...data, address: event.target.value});
    }
    const showDropIn = ()=>{
        return <div onBlur={()=>setData({...data, error: ""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Delivery address: </label>
                        <textarea onChange={handleAddress}
                        className="form-control"
                        value={data.address}
                        placeholder="Type where you want it delivered"
                        />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance=>(data.instance = instance)}/>
                    <button onClick={buy} className="btn btn-success">Pay</button>
                </div>
                
            ): null}
        </div>
    }

    const showError = error =>{
        return <div className="alert alert-danger" style={{display: error?"":"none"}}>{error}</div>
    }

    const showSuccess = success =>{
        return <div className="alert alert-info" style={{display: success?"":"none"}}>Thanks! Your payment was successful!</div>
    }


    return <div>
        <h2>Total: Rs. {getTotal()}</h2>
        {showError(data.error)}
        {showSuccess(data.success)}
        {showCheckout()}
    </div>
}

export default Checkout;