import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementProduct, decrementProduct } from '../redux/actions/cartActions';
import { toKebabCase } from '../pipes/pipe';  // Adjust the import path as necessary

import './cart.css';

const Cart = ({ setToggleCart }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemsCount = useSelector((state) => state.cart.items.reduce((count, item) => count + item.count, 0));
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const handleAttributeSelect = (attributeName, itemValue) => {
        setSelectedAttributes(prevAttributes => ({
            ...prevAttributes,
            [attributeName]: itemValue
        }));
    };

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncrement = (productId) => {
        dispatch(incrementProduct(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementProduct(productId));
    };

    const calculateTotalPrice = () => {
        const total = cartItems.reduce((sum, item) => sum + item.count * item.prices.amount, 0);
        setTotalPrice(total);
    };

    const handlePlaceOrder = () => {
        const order = {
            items: cartItems,
            totalPrice,
            date: new Date().toISOString()
        };
        localStorage.setItem('order', JSON.stringify(order));
        alert('Order placed successfully!');
    };

    const toKebabCase = (str) => {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    };

    return (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed bg-gray-500 bg-opacity-75 transition-opacity cart-overlay" onClick={() => setToggleCart(false)} aria-hidden="true"></div>
            <div className="fixed">
                <div className="absolute">
                    <div className="pointer-events-none fixed top-16 md:right-12 right-0 flex max-w-full pl-10 h-4/5 overflow-y-auto">
                        <div className="pointer-events-auto relative w-screen 	 max-w-md ">
                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                {/* <button
                                    type="button"
                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={() => setToggleCart(false)}
                                >
                                    <span className="absolute -inset-2.5"></span>
                                    <span className="sr-only">Close panel</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button> */}
                            </div>
                            <div className="flex flex-col bg-slate-100 py-6 shadow-xl ">
                                <div className="px-4 sm:px-6">
                                    <h2 className="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">My Bag :{cartItemsCount === 1 ? ' ' + cartItemsCount + ' item' : ' ' + cartItemsCount + ' items'}</h2>
                                </div>

                                {cartItems.map((cartItem , index) => (
                                    <div className="grid grid-cols-5 mt-4 gap-1 relative" key={cartItem.id+index}>
                                        <div className="flex flex-col col-span-2 p-2">
                                            <h1 className="text-base font-light">{cartItem.name}</h1>
                                            <p className="text-base text-gray-900 mt-2">
                                                {cartItem.prices.amount + cartItem.prices.currency.symbol}
                                            </p>

                                            {cartItem.attributes.map((attribute, index) => (
                                                <div className="mt-2" key={index} data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}`}>
                                                    <h3 className="text-sm mb-2 font-normal">{attribute.name}</h3>
                                                    <div className="flex space-x-2">
                                                        {attribute.items.map((item, itemIndex) => {
                                                            const isSelected = cartItem.selectedAttributes[attribute.name] === item.value;
                                                            return (
                                                                attribute.name === 'Color' ?
                                                                    <button
                                                                        key={itemIndex}
                                                                        className={`w-6 h-6  ${isSelected ? 'border-2 border-green-600' : ''}`}
                                                                        style={{ backgroundColor: item.value }}
                                                                        onClick={() => handleAttributeSelect(attribute.name, item.value)}
                                                                        data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}-${toKebabCase(item.value)}${isSelected ? '-selected' : ''}`}
                                                                    ></button>
                                                                    :
                                                                    <button
                                                                        key={itemIndex}
                                                                        className={`px-2 py-1 border rounded ${isSelected ? 'border-green-600' : ''}`}
                                                                        onClick={() => handleAttributeSelect(attribute.name, item.value)}
                                                                        data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}-${toKebabCase(item.value)}${isSelected ? '-selected' : ''}`}
                                                                    >
                                                                        {item.displayValue}
                                                                    </button>
                                                            );
                                                        })}
                                                    </div>
                                                    
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col col-span-1 justify-around items-center">
                                            <div>
                                                <button onClick={() => handleIncrement(cartItem.id)} className="border-2 border-slate-600 py-1 px-2" data-testid="cart-item-amount-increase">+</button>
                                            </div>
                                            <div>
                                                <p className="my-2" data-testid="cart-item-amount">{cartItem.count}</p>
                                            </div>
                                            <div>
                                                <button onClick={() => handleDecrement(cartItem.id)} className="border-2 border-slate-600 py-1 px-2" data-testid="cart-item-amount-decrease">-</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center col-span-2">
                                            <img src={cartItem.gallery[0]} alt={cartItem.name} className="max-w-full max-h-full object-cover" />
                                        </div>
                                        <button className='text-red-500 text-lg font-bold absolute top-0 right-1' onClick={() => handleRemove(cartItem)}>X</button>
                                    </div>
                                ))}

                                <div className="px-4 sm:px-6 mt-4">
                                    <h2 className="text-base font-semibold leading-6 text-gray-900" data-testid="cart-total">Total Price: {totalPrice.toFixed(2)}</h2>
                                </div>

                                <div className="px-4 sm:px-6 mt-4">
                                    <button
                                        className="w-full bg-green-600 text-white py-2 px-4 rounded"
                                        onClick={handlePlaceOrder}
                                    >
                                        Place Order
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
