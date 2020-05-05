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
const db = firebase.database().ref();

const App = () => {

  const [data, setData] = useState({});
  const [cart,setCart] = useState(false);
  const [selected,setSelected] = useState({});
  const products = Object.values(data);
  const [order,setOrder] = React.useState('');
  const [stock,setStock] = React.useState('');

  useEffect(() => {


		const handleData = snap => {
			if (snap.val()) setStock(snap.val());
		};
		db.on('value', handleData, error => alert(error));
		return () => { db.off('value', handleData); };
  }, []);

  
  useEffect(() => {

    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();

      setData(json);
    };
    fetchProducts();
  }, []);

  const toggleCart = currentCart =>{
    if (currentCart === false){
      setCart(true);
    }
    else{
      setCart(false);
      }
  }

  return (
    <React.Fragment>
      <Selector order={order} setOrder={setOrder}/>
      <Box position ="absolute" top={0} right={0}>
        <Button onClick={()=>{toggleCart(cart)}}>{cart===false? "Open cart" : "Close cart"}</Button>
      </Box>
      <Drawer anchor = "right" open={cart} onClose={() => {toggleCart(cart)}}>
         <ShoppingCart  selected={selected}  setSelected={setSelected}/>
      </Drawer>
      <ProductList products = {products} order = {order} selected={selected} stock={stock} setSelected={setSelected}/>
    </React.Fragment>
  );
};

export default App;
