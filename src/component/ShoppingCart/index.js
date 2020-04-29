import React from "react";
import Sidebar from "react-sidebar";
import { makeStyles, Grid, Box } from "@material-ui/core";
import CartItem from "../CartItem";

const ShoppingCart = ({items}) =>{

    var total = 0;

    console.log("testing")


    for (var i =0;i<items.length;i++ ){
        total += items[i].price;
    }

    return (

        <Box padding = {10}>
            <Grid container direction="column">
                {items.map(item => <CartItem key={item.sku} item={item}/>)}
            </Grid>
            <Box>
            Total {total}
            </Box>
        </Box>
        
    );
}

export default ShoppingCart;