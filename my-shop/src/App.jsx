import React from 'react';
import { Container, Typography } from '@mui/material';
import ProductList from './components/ProductList';

function App() {
  return (
    <Container>
      <Typography variant="h3" component="h1" align="center" sx={{ my: 4 }}>
        Интернет-магазин
      </Typography>
      <ProductList />
    </Container>
  );
}

export default App;