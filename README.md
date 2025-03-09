|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 12: Завершение разработки приложения**

#### **Введение**
На прошлом занятии мы реализовали функциональность корзины, включая добавление и удаление товаров, а также отображение общей стоимости. Сегодня мы завершим разработку приложения, добавив:
1. Переключение между светлой и темной темой с сохранением состояния.
2. Локальное кэширование корзины.
3. Улучшение интерфейса и адаптивность.

---

### **Шаг 1: Переключение между светлой и темной темой**

#### **1.1. Создание контекста для темы**
Создадим файл `src/context/ThemeContext.jsx` для управления темой:

```jsx
import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
```

#### **1.2. Интеграция темы в приложение**
Обновим файл `src/main.jsx`, чтобы обернуть приложение в `ThemeContextProvider`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { ThemeContextProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeContextProvider>
        <CssBaseline />
        <App />
      </ThemeContextProvider>
    </PersistGate>
  </Provider>
);
```

#### **1.3. Добавление переключателя темы**
Обновим файл `src/App.jsx`, чтобы добавить переключатель темы:

```jsx
import React, { useContext } from 'react';
import { Container, Typography, Grid, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Container>
      <Typography variant="h3" component="h1" align="center" sx={{ my: 4 }}>
        Интернет-магазин
      </Typography>
      <IconButton onClick={toggleTheme} sx={{ position: 'absolute', top: 16, right: 16 }}>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={3}>
          <Cart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
```

---

### **Шаг 2: Локальное кэширование корзины**

#### **2.1. Настройка `redux-persist`**
Убедитесь, что `redux-persist` настроен правильно. Обновите файл `src/store/store.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
```

---

### **Шаг 3: Улучшение интерфейса**

#### **3.1. Адаптивный интерфейс**
Обновим файл `src/App.jsx`, чтобы сделать интерфейс адаптивным:

```jsx
import React, { useContext } from 'react';
import { Container, Typography, Grid, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Container>
      <Typography variant="h3" component="h1" align="center" sx={{ my: 4 }}>
        Интернет-магазин
      </Typography>
      <IconButton onClick={toggleTheme} sx={{ position: 'absolute', top: 16, right: 16 }}>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={3}>
          <Cart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
```

#### **3.2. Улучшение стилей**
Обновим файл `src/components/ProductCard.jsx`:

```jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
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
          <Button
            variant="contained"
            onClick={() => dispatch(addToCart(product))}
            sx={{ mt: 2 }}
          >
            Добавить в корзину
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
```

Обновим файл `src/components/Cart.jsx`:

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  return (
    <Card sx={{ maxWidth: '100%', margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">Корзина</Typography>
        <List>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ListItem>
                <ListItemText
                  primary={item.title}
                  secondary={`${item.quantity} x ${item.price}$`}
                />
                <Button onClick={() => dispatch(removeFromCart(item))}>Удалить</Button>
              </ListItem>
            </motion.div>
          ))}
        </List>
        <Typography variant="h6">Общая стоимость: {total}$</Typography>
        <Button onClick={() => dispatch(clearCart())} variant="contained" color="error" sx={{ mt: 2 }}>
          Очистить корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default Cart;
```

---

### **Итог**
Теперь приложение имеет:
1. Переключение между светлой и темной темой с сохранением состояния.
2. Локальное кэширование корзины.
3. Улучшенный и адаптивный интерфейс.
