import React, { useEffect, useState } from 'react';
import Sidebar from "react-sidebar";
import { makeStyles, Grid, Box } from "@material-ui/core";
import CartItem from "../CartItem";

const ShoppingCart = ({selected,total,stock,setTotal,setCart,user,setSelected}) =>{


    
    const keys =Object.keys(selected);
    var temp=0;

    if (selected !=="{}"){

   
    console.log(selected[keys[0]])
    for (const key of keys){
        const sizes = Object.keys(selected[key]['size'])
        for(const size of sizes){
            temp += selected[key]['size'][size]*selected[key]['product']['price']
        }
    }
    }
    setTotal(temp)
    


    return (
        <Box padding = {10}>
            <Grid container direction="column">
                {Object.keys(selected).map((sku,index) => Object.keys(selected[sku]['size']).map(size=>
                <CartItem   key={sku}
                            user = {user}
                            setTotal={setTotal}
                            size={size}
                            stock={stock[sku]}
                            quantity={selected[sku]['size'][size]}
                            item = {selected[sku]['product']}
                            selected={selected}
                            setSelected={setSelected}/>))}
            </Grid>
            <Box>
            Total ${temp}
            </Box>
        </Box>
    );
}

export default ShoppingCart;