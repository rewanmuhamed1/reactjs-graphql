import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { setProducts } from './redux/actions/productActions';
import { Routes, Route ,Navigate} from 'react-router-dom';
import { setCategories } from './redux/actions/categoryAction';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { loadCartFromStorage } from './redux/actions/cartActions';
import { GET_DATA } from './graphql/queries';
import './App.css';


function App() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_DATA );

  useEffect(() => {
    
    if (data) {
      dispatch(setProducts(data.products));
     
      dispatch(setCategories(data.categories));
      
    }
    dispatch(loadCartFromStorage());
    
  }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    //console.error('ApolloError:', error);
    return <p>Error: {error.message}</p>;
  }
 
  return (
    <div>
      <Navbar />

     
        <Routes >
        
          <Route path="/" element={<Navigate to="/category/all" />} />
          <Route  path="/category/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes >
      
    </div>
  );
};

export default App;
