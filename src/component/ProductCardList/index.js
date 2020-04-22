import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductCard from "../ProductCard"


const ProductCardList = ({products}) =>{
    return(
        <React.Fragment>
            <Container fixed>
                <Grid container space = {2} direction = "row">
                    {products.map(product =>
                        <Grid item xs={3} key={product.sku}>
                             <ProductCard product={product}  />
                        </Grid>)
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ProductCardList;