import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import ProductList from "./component/ProductCardList"
import Selector from './component/Selector';
import { Button,Box,Drawer } from '@material-ui/core';
import ShoppingCart from "./component/ShoppingCart";


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
  const [cart,setCart] = useState(false);
  const [selected,setSelected] = useState([]);
  const products = Object.values(data);
  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
      console.log(json)
    };
    fetchProducts();
  }, []);


  const toggleCart = currentCart =>{
    if (currentCart === false){
      setCart(true);
      setSelected(products)
    }
    else{
      setCart(false);
      }
  }

  return (
    <React.Fragment>
      <Selector />
      <Box position ="absolute" top={0} right={0}>
        <Button onClick={()=>{toggleCart(cart)}}>{cart===false? "Open cart" : "Close cart"}</Button>
      </Box>
      <Drawer anchor = "right" open={cart} onClose={() => {toggleCart(cart)}}>
         <ShoppingCart items={selected} />
       </Drawer>
      <ProductList products = {products} />
    </React.Fragment>
  );
};

export default App;