|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 11: Реализация корзины**

#### **Введение**
На прошлом занятии мы добавили фильтрацию, сортировку и поиск товаров, а также улучшили интерфейс с помощью анимаций. Сегодня мы реализуем функциональность корзины, которая позволит пользователям добавлять товары в корзину, удалять их и видеть общую стоимость.

---

#### **Шаг 1: Создание слайса для корзины**
Для начала мы создадим новый слайс для управления состоянием корзины. Этот слайс будет содержать список товаров в корзине и общую стоимость.

Создадим файл `src/features/cartSlice.js`. В этом файле определим начальное состояние корзины и создадим редьюсеры для добавления и удаления товаров.

```javascript
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.items.find((item) => item.id === action.payload.id);
      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      }
      state.total -= action.payload.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

#### **Шаг 2: Настройка хранилища**
Теперь мы добавим слайс корзины в хранилище Redux. Обновим файл `src/store/store.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
```

---

#### **Шаг 3: Создание компонента Cart**
Теперь мы создадим компонент `Cart`, который будет отображать товары в корзине и общую стоимость.

Создадим файл `src/components/Cart.jsx`. В этом компоненте мы будем использовать `useSelector` для получения состояния корзины из Redux и отображать список товаров и общую стоимость.

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h6">Корзина</Typography>
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.title}
                secondary={`${item.quantity} x ${item.price}$`}
              />
              <Button onClick={() => dispatch(removeFromCart(item))}>Удалить</Button>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Общая стоимость: {total}$</Typography>
        <Button onClick={() => dispatch(clearCart())} variant="contained" color="error">
          Очистить корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default Cart;
```

---

#### **Шаг 4: Добавление кнопки "Добавить в корзину"**
Теперь мы добавим кнопку "Добавить в корзину" в компонент `ProductCard`. При нажатии на эту кнопку товар будет добавляться в корзину.

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
          <Button
            variant="contained"
            onClick={() => dispatch(addToCart(product))}
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

---

#### **Шаг 5: Интеграция корзины в приложение**
Теперь мы добавим компонент `Cart` в основное приложение. Обновим файл `src/App.jsx`:

```jsx
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
```

---

#### **Шаг 6: Улучшение интерфейса**
Чтобы сделать наше приложение более привлекательным, мы добавим анимации при добавлении товаров в корзину. Для этого мы будем использовать библиотеку `framer-motion`.

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
    <Card sx={{ maxWidth: 345, margin: 2 }}>
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
        <Button onClick={() => dispatch(clearCart())} variant="contained" color="error">
          Очистить корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default Cart;
```

---

#### **Заключение**
На этом занятии мы реализовали функциональность корзины, включая добавление и удаление товаров, а также отображение общей стоимости. В следующий раз мы добавим возможность сохранения состояния корзины в локальном хранилище браузера и реализуем поддержку темной/светлой темы.
