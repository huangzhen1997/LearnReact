import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { Select, InputLabel,MenuItem,FormControl, Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Selector = () =>{
    const classes = useStyles();
    const [order,setOrder] = React.useState('');

    const handleChange = (event) =>{
        setOrder(event.target.value)
    };

    return (
        <Container>
            <FormControl className={classes.formControl}>
                <InputLabel id="display-order-select-label">
                    Order by
                </InputLabel> 
                <Select
                    labelId="display-order-select-label"
                    id="display-order-select"
                    value={order}
                    onChange={handleChange} 
                >
                    <MenuItem value="lowest-to-highest">lowest to highest</MenuItem>
                    <MenuItem value="highest-to-lowest">highest to lowest</MenuItem>
                    
                </Select>
            </FormControl>
        </Container>
          
    )
};

export default Selector;