import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearchChange }) => {
  return (
    <TextField
      fullWidth
      label="Поиск товаров"
      variant="outlined"
      sx={{ my: 2 }}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;