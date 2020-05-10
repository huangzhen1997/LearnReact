import React from 'react';
import {Box,Grid,Button} from '@material-ui/core';
import 'firebase/database';
import { firebase, storage } from '../../shared/firebase.js'
import { Label } from 'rbx';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const CartItem = ({item,user,setTotal,quantity,stock,size,setSelected,selected}) =>{

    console.log("the size is ")
    console.log(quantity)

    const addingToCart = (cur_pro)=>{

        if(stock[size]===0){
            alert("out of stock");
            return false
        }

        stock[size]-=1;
        const second_dbRef = firebase.database().ref('inventory/'+cur_pro.sku);
        second_dbRef.set(stock)
                .catch(error => {
                    alert(error);
                    console.log("can't update database")
                });

        const tempSelected=selected;
        if(cur_pro.sku in tempSelected){
            tempSelected[cur_pro.sku]['size'][size]+=1;    
        }

        else{
            console.log("firstime")
            tempSelected[cur_pro.sku]={};
            tempSelected[cur_pro.sku]['size'][size]=1;
            tempSelected[cur_pro.sku]['product']=cur_pro;
        }

        const dbRef = firebase.database().ref('carts/'+user.displayName);
        dbRef.set(tempSelected)
                .catch(error => {
                    alert(error);
                    console.log("can't update database")
                });
            
        setSelected(tempSelected);

        const keys =Object.keys(selected);
        var temp=0;
        console.log(selected[keys[0]])
        for (const key of keys){
            const sizes = Object.keys(selected[key]['size'])
            for(const size of sizes){
                temp += selected[key]['size'][size]*selected[key]['product']['price']
            }
        }
    
        setTotal(temp)

    }

    const removingFromCart = (cur_pro)=>{

        stock[size]+=1;
        const second_dbRef = firebase.database().ref('inventory/'+cur_pro.sku);
        second_dbRef.set(stock)
                .catch(error => {
                    alert(error);
                    console.log("can't update database")
                });

        const tempSelected=selected;

        if(cur_pro.sku in tempSelected){
            tempSelected[cur_pro.sku]['size'][size]-=1;
            if(tempSelected[cur_pro.sku]['size'][size]===0){
                delete tempSelected[cur_pro.sku]; 
            }
            setSelected(tempSelected);
        }

        const keys =Object.keys(selected);
        var temp=0;
        console.log(selected[keys[0]])
        for (const key of keys){
            const sizes = Object.keys(selected[key]['size'])
            for(const size of sizes){
                temp += selected[key]['size'][size]*selected[key]['product']['price']
            }
        }
    
        setTotal(temp)
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
            <Label>{size}</Label>
            <Button  onClick={()=>addingToCart(item)}>
                         + 
            </Button>
            <Button onClick={()=>removingFromCart(item)}>
                         -
            </Button>
            <Box  fontWeight="dark">
                {quantity}  X  {item.currencyFormat + item.price.toString()}
            </Box>
       	</Box> 
        
       </Box>
        </Grid>
    )
}

export default CartItem;