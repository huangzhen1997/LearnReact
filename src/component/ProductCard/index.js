import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card,CardMedia,CardContent,CardActionArea,CardActions,Typography,Grid,Button} from '@material-ui/core';



const useStyles = makeStyles({
    root: {
      maxWidth: 445,
    },
    media: {
      height: 540
    },
  });

const ProductCard = ({product}) => {

    console.log("The produce is : ")
    console.log(product)

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
                    <Typography align="center" gutterBottom variant='subtitle1' component="p">
                            {product.description}
                    </Typography>
                    <Typography align="center" gutterBottom variant='subtitle1' component="p">
                            {product.description}
                    </Typography>
                </CardContent>  
            </CardActionArea>
            <CardActions>
                 <Grid container justify="space-around">
                     <Button color="default" variant="outlined" className={classes.sizeButton}>
                         S
                     </Button>
                     <Button color="default" variant="outlined" className={classes.sizeButton}>
                         M
                     </Button>
                     <Button color="default" variant="outlined" className={classes.sizeButton}>
                         L
                     </Button>
                     <Button color="default" variant="outlined" className={classes.sizeButton}>
                         XL
                     </Button>
                 </Grid>
             </CardActions> 
             <CardActions>
                 <Grid container justify="center">
                     <Button size="large" variant="contained" color="primary">
                         Add to Cart
                    </Button>
                </Grid>
            </CardActions>
        </Card>

    );
}

export default ProductCard;