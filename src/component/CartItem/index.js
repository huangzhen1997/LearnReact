import React from 'react';
import {Box,Grid} from '@material-ui/core';

const CartItem = ({item}) =>{

    
    return (
        <Grid item key={item.sku} xd={2} border ={1} height ="60%">
             <Box border={1} align="center" height="50%" width="50%" position="relative">
       	<Box pt={2}>
       		<img src={"../data/products/" + item.sku.toString() + "_1.jpg"} height="50%" width="75%" alt={item.title}/>
       	</Box>  
       	<Box fontWeight="500" fontSize="50%">
       	{item.title}
       	</Box>
       	<Box fontSize='50%' fontStyle="italic" fontWeight="light">
       	{item.description}
       	</Box>
       	<Box >
       	{item.currencyFormat + item.price.toString()}
       	</Box>
       </Box>
        </Grid>
    )
}

export default CartItem;