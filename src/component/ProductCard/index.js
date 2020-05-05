
import {makeStyles} from "@material-ui/core/styles";
import {Card,CardMedia,CardContent,CardActionArea,CardActions,Typography,Grid,Button} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { teal } from "@material-ui/core/colors";
import { Label } from "rbx";

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

const ProductCard = ({product,stock,selected,setSelected}) => {

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


    const addingToCart = (cur_pro)=>{

        console.log("calling function")
        const tempSelected=selected;
        if(cur_pro.sku in tempSelected){
            tempSelected[cur_pro.sku]['quantity']=+1;
            setSelected(tempSelected);
        }
        else{
            tempSelected[cur_pro.sku]={};
            tempSelected[cur_pro.sku]['quantity']=1;
            tempSelected[cur_pro.sku]['product']=cur_pro;
            setSelected(tempSelected);
        }
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
                     <Button size="large" variant="contained" color="primary" onClick={()=>addingToCart(product)}>
                         Add to Cart
                    </Button>
                    
                </Grid>
                
            </CardActions>
        </Card>
    );
}

export default ProductCard;