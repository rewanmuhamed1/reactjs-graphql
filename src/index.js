import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore , applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { thunk } from 'redux-thunk'; 
import './index.css';
import App from './App';




const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer , applyMiddleware(thunk));


root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
   </BrowserRouter>
  </React.StrictMode>
  </ApolloProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
