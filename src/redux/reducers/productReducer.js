const initState = {
    products: [
  
  
    ]
  }
  
  const productReducer = (state = initState, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        // const products = JSON.parse(localStorage.getItem('products'));
  
        return {
          ...state,
          products: action.payload ,
        }
     
  
      default:
        return state;
    }
  
  };
  
  export default productReducer;