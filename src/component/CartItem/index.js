import React from 'react';
import {Box,Grid,Button} from '@material-ui/core';

const CartItem = ({item,setTotal,size,setSelected,selected}) =>{

    console.log("the size is ")
    console.log(size)

    const addingToCart = (cur_pro)=>{

        const tempSelected=selected;
        if(cur_pro.sku in tempSelected){
            tempSelected[cur_pro.sku]['quantity']+=1;
            setSelected(tempSelected);
        }
        else{
            console.log("firstime")
            tempSelected[cur_pro.sku]={};
            tempSelected[cur_pro.sku]['quantity']=1;
            tempSelected[cur_pro.sku]['product']=cur_pro;
            setSelected(tempSelected);
        }

        const keys =Object.keys(selected);
        var temp=0;
        for (const key of keys){
            temp += selected[key]['quantity']*selected[key]['product']['price']
        }
        setTotal(temp);
    }

    const removingFromCart = (cur_pro)=>{

        const tempSelected=selected;

        if(cur_pro.sku in tempSelected){
            tempSelected[cur_pro.sku]['quantity']-=1;
            if(tempSelected[cur_pro.sku]['quantity']===0){
                delete tempSelected[cur_pro.sku]; 
            }
            setSelected(tempSelected);
        }
        const keys =Object.keys(selected);
        var temp=0;
        
        for (const key of keys){
            temp += selected[key]['quantity']*selected[key]['product']['price']
        }
        setTotal(temp);
    }


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
            <Button  onClick={()=>addingToCart(item)}>
                         + 
            </Button>
            <Button onClick={()=>removingFromCart(item)}>
                         -
            </Button>
            <Box  fontWeight="dark">
                {size}  X  {item.currencyFormat + item.price.toString()}
            </Box>
       	</Box> 
        
       </Box>
        </Grid>
    )
}

export default CartItem;