import React, { useEffect, useState } from 'react';
import 'firebase/database';
import { firebase, storage } from './shared/firebase.js'
import './App.css';
import ProductList from "./component/ProductCardList"
import Selector from './component/Selector';
import { Button,Box,Drawer } from '@material-ui/core';
import ShoppingCart from "./component/ShoppingCart";
import Login from "./component/login"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const db = firebase.database().ref();

console.log(db)


const App = () => {


  const [data, setData] = useState({});
  const [cart,setCart] = useState(false);
  const [selected,setSelected] = useState({});
  const products = Object.values(data);
  const [order,setOrder] = React.useState('');
  const [stock,setStock] = React.useState('');
  const [user, setUser] = useState(null);
  const [initialRender, setInitialRender] = useState(true);



  useEffect(() => {

    console.log(firebase.auth())
    firebase.auth().onAuthStateChanged(user => {
			setUser(user);
			setInitialRender(false);
			console.log(user);
    });
    
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

  return (!initialRender && (
    <Router>
      <Switch>

      <Route exact path ="/" component={Login} />

        <Route exact path="/home" component={() =>
            <React.Fragment>
              <Selector order={order} setOrder={setOrder}/>
              <Box position ="absolute" top={0} right={0}>
                <Button onClick={()=>{toggleCart(cart)}}>{cart===false? "Open cart" : "Close cart"}</Button>
              </Box>
              <Drawer anchor = "right" open={cart} onClose={() => {toggleCart(cart)}}>
                <ShoppingCart  selected={selected}  setSelected={setSelected}/>
              </Drawer>
              <ProductList products = {products} order = {order} selected={selected} stock={stock.inventory} setSelected={setSelected}/>
            </React.Fragment>} />

        
      </Switch>

    </Router>
  ));
};

export default App;
