|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 10: Фильтрация, сортировка и поиск товаров**

#### **Введение**
На прошлом занятии мы создали базовую структуру интернет-магазина, настроили Redux Toolkit для управления состоянием и реализовали отображение товаров. Сегодня мы добавим функциональность фильтрации, сортировки и поиска товаров, а также улучшим интерфейс с помощью Material-UI. Эти функции сделают наше приложение более удобным и функциональным для пользователей.

---

#### **Шаг 1: Добавление фильтрации по категориям**
Для начала мы добавим возможность фильтрации товаров по категориям. Это позволит пользователям быстро находить товары, которые их интересуют. Мы создадим компонент `FilterPanel`, который будет содержать кнопки для выбора категорий: "Все", "Электроника", "Одежда", "Книги".

Создадим файл `src/components/FilterPanel.jsx`. В этом компоненте мы используем `ButtonGroup` из Material-UI для создания группы кнопок. Каждая кнопка будет отвечать за определенную категорию. При нажатии на кнопку будет вызываться функция `onFilterChange`, которая передаст выбранную категорию в Redux.

```jsx
import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const FilterPanel = ({ onFilterChange }) => {
  const categories = ['Все', 'electronics', 'clothing', 'books'];

  return (
    <ButtonGroup variant="contained" sx={{ my: 2 }}>
      {categories.map((category) => (
        <Button key={category} onClick={() => onFilterChange(category)}>
          {category}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FilterPanel;
```

Далее мы добавим новое состояние в Redux для хранения текущей категории. В файле `src/features/productsSlice.js` добавим поле `category` в начальное состояние и создадим редьюсер `setCategory`, который будет обновлять это поле.

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/products';

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const products = await fetchProducts();
    return products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    category: 'Все', // Добавляем состояние для категории
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = productsSlice.actions;
export default productsSlice.reducer;
```

После этого мы интегрируем фильтрацию в компонент `ProductList`. В этом компоненте мы будем фильтровать товары в зависимости от выбранной категории. Если выбрана категория "Все", то отображаются все товары. В противном случае отображаются только те товары, которые принадлежат выбранной категории.

```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, setCategory } from '../features/productsSlice';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, category } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts = category === 'Все'
    ? items
    : items.filter((product) => product.category === category);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading products.</div>;

  return (
    <div>
      <FilterPanel onFilterChange={(category) => dispatch(setCategory(category))} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
```

---

#### **Шаг 2: Добавление сортировки товаров**
Следующим шагом мы добавим возможность сортировки товаров. Пользователи смогут сортировать товары по цене (возрастание и убывание) и по рейтингу. Для этого мы создадим компонент `SortPanel`, который будет содержать выпадающий список с вариантами сортировки.

Создадим файл `src/components/SortPanel.jsx`. В этом компоненте мы используем `Select` из Material-UI для создания выпадающего списка. При изменении значения в списке будет вызываться функция `onSortChange`, которая передаст выбранный способ сортировки в Redux.

```jsx
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
```

Затем мы добавим новое состояние в Redux для хранения текущего способа сортировки. В файле `src/features/productsSlice.js` добавим поле `sortBy` в начальное состояние и создадим редьюсер `setSortBy`, который будет обновлять это поле.

```javascript
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    category: 'Все',
    sortBy: 'default', // Добавляем состояние для сортировки
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;
```

После этого мы интегрируем сортировку в компонент `ProductList`. В этом компоненте мы будем сортировать товары в зависимости от выбранного способа сортировки. Например, если выбран способ "По цене (возрастание)", то товары будут отсортированы по возрастанию цены.

```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, setCategory, setSortBy } from '../features/productsSlice';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import SortPanel from './SortPanel';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, category, sortBy } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts = category === 'Все'
    ? items
    : items.filter((product) => product.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading products.</div>;

  return (
    <div>
      <FilterPanel onFilterChange={(category) => dispatch(setCategory(category))} />
      <SortPanel onSortChange={(sortBy) => dispatch(setSortBy(sortBy))} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
```

---

#### **Шаг 3: Добавление поиска товаров**
Теперь мы добавим возможность поиска товаров по названию. Это позволит пользователям быстро находить нужные товары. Мы создадим компонент `SearchBar`, который будет содержать поле для ввода текста поиска.

Создадим файл `src/components/SearchBar.jsx`. В этом компоненте мы используем `TextField` из Material-UI для создания поля ввода. При изменении текста в поле будет вызываться функция `onSearchChange`, которая передаст поисковый запрос в Redux.

```jsx
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
```

Затем мы добавим новое состояние в Redux для хранения поискового запроса. В файле `src/features/productsSlice.js` добавим поле `searchQuery` в начальное состояние и создадим редьюсер `setSearchQuery`, который будет обновлять это поле.

```javascript
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    category: 'Все',
    sortBy: 'default',
    searchQuery: '', // Добавляем состояние для поискового запроса
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setSortBy, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
```

После этого мы интегрируем поиск в компонент `ProductList`. В этом компоненте мы будем фильтровать товары в зависимости от поискового запроса. Если поисковый запрос пустой, то отображаются все товары. В противном случае отображаются только те товары, название которых содержит поисковый запрос.

```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, setCategory, setSortBy, setSearchQuery } from '../features/productsSlice';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import SortPanel from './SortPanel';
import SearchBar from './SearchBar';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, category, sortBy, searchQuery } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts = category === 'Все'
    ? items
    : items.filter((product) => product.category === category);

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading products.</div>;

  return (
    <div>
      <FilterPanel onFilterChange={(category) => dispatch(setCategory(category))} />
      <SortPanel onSortChange={(sortBy) => dispatch(setSortBy(sortBy))} />
      <SearchBar onSearchChange={(query) => dispatch(setSearchQuery(query))} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
```

---

#### **Шаг 4: Улучшение интерфейса**
Чтобы сделать наше приложение более привлекательным, мы добавим анимации при появлении карточек товаров. Для этого мы будем использовать библиотеку `framer-motion`. Эта библиотека позволяет легко добавлять анимации в React-приложения.

Установим `framer-motion` с помощью команды:

```bash
npm install framer-motion
```

Затем обновим файл `src/components/ProductCard.jsx`. В этом компоненте мы обернем карточку товара в компонент `motion.div` из `framer-motion`. Мы зададим начальное состояние анимации (карточка появляется снизу с прозрачностью) и конечное состояние (карточка полностью видима). Также мы укажем длительность анимации.

```jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ maxWidth: 345, margin: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h5">{product.price}$</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
```

---

#### **Заключение**
На этом занятии мы добавили фильтрацию, сортировку и поиск товаров, а также улучшили интерфейс с помощью анимаций. Эти функции сделали наше приложение более удобным и функциональным для пользователей. В следующий раз мы добавим возможность добавления товаров в корзину и реализуем функциональность корзины.
