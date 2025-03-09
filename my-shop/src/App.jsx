import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <Container>
      <Typography variant="h3" component="h1" align="center" sx={{ my: 4 }}>
        Интернет-магазин
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <ProductList />
        </Grid>
        <Grid item xs={3}>
          <Cart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;