// reducers/cartReducer.js

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREMENT_PRODUCT,
    DECREMENT_PRODUCT,
    LOAD_CART_FROM_STORAGE,
} from '../actions/cartActions';

const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART_FROM_STORAGE:
            return {
                ...state,
                items: action.payload,
            };
        case ADD_TO_CART: {
            const product = action.payload;
            const existingProduct = state.items.find(
                (item) => item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes)
            );
            if (existingProduct) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes)
                            ? { ...item, count: item.count + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...product, count: 1 }],
                };
            }
        }
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(
                    (item) =>
                        item.id !== action.payload.id ||
                        JSON.stringify(item.selectedAttributes) !== JSON.stringify(action.payload.selectedAttributes)
                ),
            };
        case INCREMENT_PRODUCT:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload ? { ...item, count: item.count + 1 } : item
                ),
            };
        case DECREMENT_PRODUCT:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload
                        ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
                        : item
                ),
            };
        default:
            return state;
    }
};

export default cartReducer;
