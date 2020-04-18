import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyDhMawwt7dvc0FwFPX5dHZlJzecRVgLCdE",
  authDomain: "learnreact-5aad3.firebaseapp.com",
  databaseURL: "https://learnreact-5aad3.firebaseio.com",
  projectId: "learnreact-5aad3",
  storageBucket: "learnreact-5aad3.appspot.com",
  messagingSenderId: "learnreact-5aad3",
  appID: "learnreact-5aad3",
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <ul>
      {products.map(product => <li key={product.sku}>{product.title}</li>)}
    </ul>
  );
};

export default App;