import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductCard from "../ProductCard"


const ProductCardList = ({products,user,order,stock,setSelected,selected}) =>{


    return(
        <React.Fragment>
            <Container fixed>
                <Grid container space = {3} direction = "row">
                    {products.sort(
                        (product1,product2)=>       
                        {
                            if(order===''){
                                return product1["price"] > product2["price"]
                            }
                            else if (order==="lowest-to-highest"){
                                return product1["price"] - product2["price"]
                            }
                            else
                            {
                                return product2["price"]-product1["price"] 
                            }                    
                        }      
                        ).map(product =>
                        <Grid item xs={3} key={product.sku}>
                             <ProductCard product={product} user = {user} setSelected={setSelected} stock={stock === undefined ? "" : stock[product.sku]} selected={selected} />
                        </Grid>)
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ProductCardList;