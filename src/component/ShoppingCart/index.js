import React from "react";
import Sidebar from "react-sidebar";
import { makeStyles, Grid, Box } from "@material-ui/core";
import CartItem from "../CartItem";

const ShoppingCart = ({selected,setCart,setSelected}) =>{

    const [total,setTotal]=React.useState(0);
   
    return (
        <Box padding = {10}>
            <Grid container direction="column">
                {Object.keys(selected).map((sku,index) => <CartItem key={sku} setTotal={setTotal} size={selected[sku]['quantity']} item = {selected[sku]['product']} selected={selected} setSelected={setSelected}/>)}
            </Grid>
            <Box>
            Total ${total}
            </Box>
        </Box>
    );
}

export default ShoppingCart;