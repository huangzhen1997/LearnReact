
import {makeStyles} from "@material-ui/core/styles";
import {Card,CardMedia,CardContent,CardActionArea,CardActions,Typography,Grid,Button} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { teal } from "@material-ui/core/colors";
import { Label } from "rbx";
import {firebase} from "../../shared/firebase"

const useStyles = makeStyles({
    root: {
      maxWidth: 445,
    },
    media: {
      height: 540
    },

    active:{
        backgroundcolor: teal
    }
  });

const ProductCard = ({product,stock,user,selected,setSelected}) => {

    const [currentsize,setCurrentSize]=useState("")
    const stockmap =[]

    if (stock!=undefined){
        if(stock["S"]>0){
            stockmap.push("S")
        }
        if(stock["M"]>0){
            stockmap.push("M")
        }
        if(stock["L"]>0){
            stockmap.push("L")
        }
        if(stock["XL"]>0){
            stockmap.push("XL")
        }
    }
    console.log(stockmap)


    const addingToCart = (cur_pro,size)=>{

        console.log("calling function")
        const tempSelected=selected;
        

        if(!(cur_pro.sku in tempSelected)){
            tempSelected[cur_pro.sku]={};
            tempSelected[cur_pro.sku]['size'] = {};
            tempSelected[cur_pro.sku]['size'][size]=1;
            tempSelected[cur_pro.sku]['product']=cur_pro;
        }

        else{
            if (tempSelected[cur_pro.sku]['size'] !== size){
                if(size in tempSelected[cur_pro.sku]['size']){
                    tempSelected[cur_pro.sku]['size'][size]+=1;
                }
                else{
                    tempSelected[cur_pro.sku]['size'][size]=1;
                }
            }
            else{
                tempSelected[cur_pro.sku]['size'][size]+=1;
            }
        }

        const dbRef = firebase.database().ref('carts/'+user.displayName);
        dbRef.set(tempSelected)
                .catch(error => {
                    alert(error);
                    console.log("can't update database")
                });

    
        const second_dbRef = firebase.database().ref('inventory/'+stock.sku);
        stock[size]-=1;
        second_dbRef.set(stock)
                .catch(error => {
                    alert(error);
                    console.log("can't update database")
                });
            

        setSelected(tempSelected);
    }

    const changeCurrentSize=size=>{
        setCurrentSize(size)
        console.log("current size is")
        console.log(currentsize)
    }

    const classes = useStyles();
    return (
        <Card className ={classes.root} >
            <CardActionArea>
                <CardMedia className = {classes.media} image = {"/data/products/"+product.sku+"_1.jpg"}/>
                <CardContent>
                    <Typography align="center" gutterBottom variant='subtitle1' component="p">
                            {product.title}
                    </Typography>
                    <Typography align="center" gutterBottom variant='subtitle1' component="p">
                            ${product.price}
                    </Typography>             
                </CardContent>  
            </CardActionArea>
            <CardActions>
                 <Grid container justify="space-around">
                    {stockmap.map(size=>
                    <Button color="default" variant="outlined" onClick={()=>changeCurrentSize(size)} className={size===currentsize ?  "active" : "button"}>
                    {size}
                    </Button>
                    )}
                 </Grid>
             </CardActions> 
             <CardActions>
                 <Grid container justify="center">
                     <Label>{currentsize}</Label>
                </Grid>
                 <Grid container justify="center">
                     <Button size="large" variant="contained" color="primary" onClick={()=>addingToCart(product,currentsize)}>
                         Add to Cart
                    </Button>
                    
                </Grid>
                
            </CardActions>
        </Card>
    );
}

export default ProductCard;