import React from "react";
import Sidebar from "react-sidebar";
import { makeStyles, Grid, Box } from "@material-ui/core";
import CartItem from "../CartItem";

const ShoppingCart = ({selected,setSelected}) =>{

    var total = 0;

    const keys =Object.keys(selected);
    for (const key of keys){
        total += selected[key]['quantity']*selected[key]['product']['price']
    }
   
    return (
        <Box padding = {10}>
            <Grid container direction="column">
                {Object.keys(selected).map((sku,index) => <CartItem key={sku} size={selected[sku]['quantity']} item = {selected[sku]['product']} selected={selected} setSelected={setSelected}/>)}
            </Grid>
            <Box>
            Total ${total}
            </Box>
        </Box>
    );
}

export default ShoppingCart;