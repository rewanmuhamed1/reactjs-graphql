const initState = {
    categories: [],
    selectedCategory: 'all',
  }
  
  const categoryReducer = (state = initState, action) => {
  
    switch (action.type) {
      
      case 'SET_CATEGORIES':
        // const products = JSON.parse(localStorage.getItem('products'));
  
        return {
          ...state,
          categories: action.payload,
         
        }  
        case 'SET_SELECTED_CATEGORY':
        // const products = JSON.parse(localStorage.getItem('products'));
  
        return {
          ...state,
          selectedCategory: action.payload,
        }
      default:
        return state;
    }
  
  };
  
  export default categoryReducer;