// actions/cartActions.js

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_PRODUCT = 'INCREMENT_PRODUCT';
export const DECREMENT_PRODUCT = 'DECREMENT_PRODUCT';
export const LOAD_CART_FROM_STORAGE = 'LOAD_CART_FROM_STORAGE';

const saveCartToLocalStorage = (getState) => {
    const state = getState();
    localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
};

export const addToCart = (product) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_TO_CART,
            payload: product,
        });
        saveCartToLocalStorage(getState);
    };
};

export const removeFromCart = (productId) => {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: productId,
        });
        saveCartToLocalStorage(getState);
    };
};

export const incrementProduct = (productId) => {
    return (dispatch, getState) => {
        dispatch({
            type: INCREMENT_PRODUCT,
            payload: productId,
        });
        saveCartToLocalStorage(getState);
    };
};

export const decrementProduct = (productId) => {
    return (dispatch, getState) => {
        dispatch({
            type: DECREMENT_PRODUCT,
            payload: productId,
        });
        saveCartToLocalStorage(getState);
    };
};

export const loadCartFromStorage = () => {
    return {
        type: LOAD_CART_FROM_STORAGE,
        payload: JSON.parse(localStorage.getItem('cartItems')) || [],
    };
};
