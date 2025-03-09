import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortPanel = ({ onSortChange }) => {
  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'priceAsc', label: 'По цене (возрастание)' },
    { value: 'priceDesc', label: 'По цене (убывание)' },
    { value: 'rating', label: 'По рейтингу' },
  ];

  return (
    <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel>Сортировка</InputLabel>
      <Select
        label="Сортировка"
        onChange={(e) => onSortChange(e.target.value)}
        defaultValue="default"
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortPanel;