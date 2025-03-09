|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 9: Настройка проекта, базовая структура и управление состоянием**

#### **Введение**
Сегодня мы начнем разработку интернет-магазина с карточками товаров. На первом занятии мы сосредоточимся на настройке проекта, создании базовой структуры приложения, настройке Redux Toolkit для управления состоянием и реализации простого интерфейса для отображения товаров. Мы будем использовать современные инструменты, такие как React 18+, Redux Toolkit, Material-UI и Vite, чтобы обеспечить высокую производительность и удобство разработки.

---

#### **Шаг 1: Настройка проекта**
Для начала нам нужно создать новый проект. Мы будем использовать сборщик Vite, так как он обеспечивает быструю разработку и поддержку React 18+. Откройте терминал и выполните следующую команду:

```bash
npm create vite@latest my-shop --template react
```

Эта команда создаст новый проект с именем `my-shop` на основе шаблона React. После завершения установки перейдите в папку проекта и установите необходимые зависимости:

```bash
cd my-shop
npm install
```

Теперь установим дополнительные библиотеки, которые нам понадобятся: Redux Toolkit для управления состоянием, Material-UI для стилизации, axios для работы с API и react-router-dom для маршрутизации:

```bash
npm install @reduxjs/toolkit react-redux @mui/material @emotion/react @emotion/styled axios react-router-dom
```

После установки всех зависимостей создадим базовую структуру папок. Внутри папки `src` создадим следующие директории:
- `api/` — для функций, связанных с работой с API.
- `components/` — для React-компонентов.
- `features/` — для слайсов Redux.
- `pages/` — для страниц приложения.
- `store/` — для настройки Redux store.
- `styles/` — для глобальных стилей и тем.

---

#### **Шаг 2: Создание mock API**
Поскольку у нас нет реального API, мы создадим mock API с помощью `json-server`. Это позволит нам имитировать работу с сервером. Сначала установим `json-server` глобально:

```bash
npm install -g json-server
```

Теперь создадим файл `data.json` в папке `public`. Этот файл будет содержать mock-данные для товаров. Вот пример структуры данных с 30 товарами:

```json
{
  "products": [
    {
      "id": 1,
      "title": "Ноутбук ASUS VivoBook 15",
      "price": 45000,
      "description": "15.6 дюймов, Intel Core i5, 8 ГБ ОЗУ, 512 ГБ SSD",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.7
    },
    {
      "id": 2,
      "title": "Смартфон Samsung Galaxy S21",
      "price": 60000,
      "description": "6.2 дюймов, 128 ГБ, Phantom Gray",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.8
    },
    {
      "id": 3,
      "title": "Наушники Sony WH-1000XM4",
      "price": 25000,
      "description": "Беспроводные, шумоподавление, черный",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.9
    },
    {
      "id": 4,
      "title": "Фитнес-браслет Xiaomi Mi Band 6",
      "price": 3000,
      "description": "Цветной AMOLED-экран, черный",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.6
    },
    {
      "id": 5,
      "title": "Планшет Apple iPad Air",
      "price": 55000,
      "description": "10.9 дюймов, 64 ГБ, Space Gray",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.8
    },
    {
      "id": 6,
      "title": "Фотоаппарат Canon EOS R6",
      "price": 150000,
      "description": "Зеркальный, 20 Мп, 4K видео",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.9
    },
    {
      "id": 7,
      "title": "Монитор Dell UltraSharp 27",
      "price": 40000,
      "description": "27 дюймов, 4K, IPS",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.7
    },
    {
      "id": 8,
      "title": "Игровая мышь Logitech G502",
      "price": 5000,
      "description": "11 программируемых кнопок, RGB",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.8
    },
    {
      "id": 9,
      "title": "Клавиатура Keychron K6",
      "price": 7000,
      "description": "Механическая, Bluetooth, 65%",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.7
    },
    {
      "id": 10,
      "title": "Колонка JBL Flip 5",
      "price": 8000,
      "description": "Портативная, водонепроницаемая, синий",
      "image": "https://via.placeholder.com/150",
      "category": "electronics",
      "rating": 4.6
    },
    {
      "id": 11,
      "title": "Футболка мужская",
      "price": 1500,
      "description": "Хлопок, черный",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.5
    },
    {
      "id": 12,
      "title": "Джинсы женские",
      "price": 3000,
      "description": "Скинни, синий",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.6
    },
    {
      "id": 13,
      "title": "Куртка зимняя",
      "price": 10000,
      "description": "Пуховая, черный",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.7
    },
    {
      "id": 14,
      "title": "Кроссовки Nike Air Max",
      "price": 8000,
      "description": "Беговые, белый",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.8
    },
    {
      "id": 15,
      "title": "Рюкзак Herschel",
      "price": 5000,
      "description": "Повседневный, синий",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.6
    },
    {
      "id": 16,
      "title": "Часы Casio G-Shock",
      "price": 12000,
      "description": "Ударопрочные, черный",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.7
    },
    {
      "id": 17,
      "title": "Очки Ray-Ban",
      "price": 9000,
      "description": "Солнцезащитные, черный",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.8
    },
    {
      "id": 18,
      "title": "Шапка вязаная",
      "price": 1000,
      "description": "Шерсть, серый",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.5
    },
    {
      "id": 19,
      "title": "Платье вечернее",
      "price": 7000,
      "description": "Шелк, черный",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.7
    },
    {
      "id": 20,
      "title": "Сумка женская",
      "price": 6000,
      "description": "Кожа, бежевый",
      "image": "https://via.placeholder.com/150",
      "category": "clothing",
      "rating": 4.6
    },
    {
      "id": 21,
      "title": "Книга '1984'",
      "price": 500,
      "description": "Джордж Оруэлл",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.9
    },
    {
      "id": 22,
      "title": "Книга 'Мастер и Маргарита'",
      "price": 600,
      "description": "Михаил Булгаков",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.8
    },
    {
      "id": 23,
      "title": "Книга 'Гарри Поттер и Философский камень'",
      "price": 700,
      "description": "Джоан Роулинг",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.9
    },
    {
      "id": 24,
      "title": "Книга 'Война и мир'",
      "price": 800,
      "description": "Лев Толстой",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.7
    },
    {
      "id": 25,
      "title": "Книга 'Преступление и наказание'",
      "price": 550,
      "description": "Федор Достоевский",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.8
    },
    {
      "id": 26,
      "title": "Книга 'Маленький принц'",
      "price": 400,
      "description": "Антуан де Сент-Экзюпери",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.9
    },
    {
      "id": 27,
      "title": "Книга 'Алхимик'",
      "price": 650,
      "description": "Пауло Коэльо",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.7
    },
    {
      "id": 28,
      "title": "Книга 'Три товарища'",
      "price": 750,
      "description": "Эрих Мария Ремарк",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.8
    },
    {
      "id": 29,
      "title": "Книга 'Тень горы'",
      "price": 900,
      "description": "Грегори Дэвид Робертс",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.7
    },
    {
      "id": 30,
      "title": "Книга 'Шантарам'",
      "price": 850,
      "description": "Грегори Дэвид Робертс",
      "image": "https://via.placeholder.com/150",
      "category": "books",
      "rating": 4.8
    }
  ]
}
```

Теперь запустим `json-server`, чтобы он обслуживал наш файл `data.json`:

```bash
json-server --watch public/data.json --port 3001
```

Теперь у нас есть mock API, доступный по адресу `http://localhost:3001/products`.

---

#### **Шаг 3: Создание файла `src/api/products.js`**
Этот файл будет содержать функции для работы с API. Создайте файл `src/api/products.js` и добавьте в него следующий код:

```javascript
import axios from 'axios';

// Базовый URL для mock API (json-server)
const API_URL = 'http://localhost:3001/products';

// Функция для загрузки товаров
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Возвращаем данные товаров
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
    throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
  }
};
```

---

#### **Шаг 4: Настройка Redux Toolkit**
Redux Toolkit — это современный инструмент для управления состоянием в React-приложениях. Он упрощает настройку Redux и уменьшает количество шаблонного кода. Начнем с создания слайса для управления состоянием товаров.

Создадим файл `src/features/productsSlice.js`. В этом файле определим асинхронное действие для загрузки товаров и создадим слайс:

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
  },
  reducers: {},
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

export default productsSlice.reducer;
```

Теперь настроим хранилище Redux. Создадим файл `src/store/store.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
```

Подключим хранилище к приложению. Откроем файл `src/main.jsx` и обновим его:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

#### **Шаг 5: Реализация базового интерфейса**
Теперь создадим компоненты для отображения товаров. Начнем с компонента `ProductCard`, который будет отображать информацию о товаре. Создадим файл `src/components/ProductCard.jsx`:

```jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
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
  );
};

export default ProductCard;
```

Теперь создадим компонент `ProductList`, который будет отображать список товаров. Создадим файл `src/components/ProductList.jsx`:

```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../features/productsSlice';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading products.</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
```

---

#### **Шаг 6: Настройка компонента App.jsx**
Чтобы увидеть результат, нужно отобразить компонент `ProductList` в основном компоненте приложения `App.jsx`. Откроем файл `src/App.jsx` и добавим следующий код:

```jsx
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
```

---

#### **Шаг 7: Запуск приложения**
Теперь запустите ваше приложение с помощью команды:

```bash
npm run dev
```

После этого откройте браузер и перейдите по адресу, который указан в терминале (обычно это `http://localhost:5173`).

---

#### **Шаг 8: Проверка работы приложения**
После выполнения всех шагов ваше приложение должно выглядеть примерно так:

1. Заголовок "Интернет-магазин" в центре страницы.
2. Список из 30 товаров, каждый из которых отображается в виде карточки с изображением, названием, описанием и ценой.

---

### **Заключение**
На этом занятии мы настроили проект, создали mock API, настроили Redux Toolkit для управления состоянием и реализовали базовый интерфейс для отображения товаров. В следующий раз мы добавим фильтрацию, сортировку и поиск, а также улучшим интерфейс с помощью анимаций и Material-UI.
