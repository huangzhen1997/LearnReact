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


const App = () => {


  const [data, setData] = useState({});
  const [cart,setCart] = useState(false);
  const products = Object.values(data);
  const [order,setOrder] = React.useState('');
  const [stock,setStock] = React.useState('');
  const [selected,setSelected] = useState({});
  const [user, setUser] = useState(null);
  const [initialRender, setInitialRender] = useState(true);
  const [total,setTotal] = useState(0);




  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
			setUser(user);
			setInitialRender(false);
      
    });
    
		const handleData = snap => {
      if (snap.val()){
        setStock(snap.val());
      } 
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

  const processCart = name =>{

    if (stock.carts===undefined || !(name in stock.carts)){

      const dbRef = firebase.database().ref('carts/'+name);
      dbRef.set("{}")
                .catch(error => {
                    alert(error);
                    console.log("can't update database")
                });
      setSelected({});
    }

    else{
      console.log("testing here");
      setSelected(stock.carts[name]);
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
                <Button onClick={()=>{toggleCart(cart);
                                      processCart(user.displayName);
                                      }}>{cart===false? "Open cart" : "Close cart"}
                </Button>
              </Box>
              <Drawer anchor = "right" open={cart} onClose={() => {toggleCart(cart)}}>
                <ShoppingCart  user = {user} total={total} setTotal={setTotal} stock={stock.inventory} selected={selected}  setSelected={setSelected}/>
              </Drawer>
              <ProductList products = {products} user={user} order = {order} selected={selected} stock={stock.inventory} setSelected={setSelected}/>
            </React.Fragment>} />

        
      </Switch>

    </Router>
  ));
};

export default App;
