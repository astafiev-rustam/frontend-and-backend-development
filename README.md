|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---


### **Практическое занятие 9: Основы React и настройка менеджера состояний**

#### **Введение**
Сегодня мы начнем создавать приложение на React с использованием менеджера состояний Redux. Наше приложение будет представлять собой простой список товаров (или задач), где мы сможем добавлять, редактировать и удалять элементы. В процессе работы мы познакомимся с основами React, научимся настраивать Redux и подключать его к приложению. К концу занятия у вас будет готовое базовое приложение, которое станет основой для дальнейшего развития.

---

#### **Шаг 1: Настройка проекта**
Для начала нам нужно создать новый проект. Мы будем использовать `create-react-app` — инструмент, который позволяет быстро настроить React-приложение. Откройте терминал и выполните следующую команду:

```bash
npx create-react-app my-app
```

Эта команда создаст новую папку `my-app` со всеми необходимыми файлами и зависимостями. После завершения установки перейдите в папку проекта:

```bash
cd my-app
```

Теперь запустите проект командой:

```bash
npm start
```

Ваше приложение откроется в браузере по адресу `http://localhost:3000`. Вы увидите стандартную страницу, созданную `create-react-app`. Мы будем постепенно изменять её, добавляя новые функции.

---

#### **Шаг 2: Установка Redux и настройка структуры проекта**
Чтобы управлять состоянием приложения, мы будем использовать Redux. Для этого установим необходимые библиотеки. В терминале выполните команду:

```bash
npm install @reduxjs/toolkit react-redux
```

Эти библиотеки помогут нам настроить Redux и подключить его к React. Теперь создадим структуру проекта. В папке `src` создайте следующие папки и файлы:

```
src/
├── components/
├── store/
│   ├── slices/
│   └── store.js
├── App.js
├── index.js
```

- Папка `components` будет содержать наши React-компоненты.
- Папка `store` будет отвечать за настройку Redux, включая создание хранилища (store) и срезов (slices).

---

#### **Шаг 3: Создание базовых компонентов**
Теперь создадим два компонента: `ProductCard` и `ProductList`. Компонент `ProductCard` будет отображать информацию об одном товаре, а `ProductList` — список всех товаров.

Начнем с `ProductCard`. В папке `components` создайте файл `ProductCard.js` и добавьте следующий код:

```jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductCard;
```

Этот компонент принимает объект `product` (с полями `name` и `price`) и отображает его в виде карточки.

Теперь создадим компонент `ProductList`. В той же папке `components` создайте файл `ProductList.js`:

```jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
```

Здесь мы принимаем массив товаров (`products`) и отображаем каждый товар с помощью компонента `ProductCard`.

---

#### **Шаг 4: Добавление компонентов в приложение**
Теперь подключим наши компоненты к основному приложению. Откройте файл `App.js` и замените его содержимое на следующий код:

```jsx
import React from 'react';
import ProductList from './components/ProductList';

const initialProducts = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
];

function App() {
  return (
    <div className="App">
      <h1>My Product List</h1>
      <ProductList products={initialProducts} />
    </div>
  );
}

export default App;
```

Здесь мы создаем массив `initialProducts` с двумя товарами и передаем его в компонент `ProductList`. Теперь, если вы откроете приложение в браузере, вы увидите список из двух товаров.

---

#### **Шаг 5: Настройка Redux**
Теперь настроим Redux для управления состоянием приложения. Начнем с создания хранилища (store). В папке `store` создайте файл `store.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
```

Здесь мы создаем хранилище и подключаем к нему редюсер (reducer), который будет управлять состоянием товаров.

Теперь создадим срез (slice) для товаров. В папке `store/slices` создайте файл `productSlice.js`:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
```

Здесь мы определяем начальное состояние (`initialState`) и два редюсера: `addProduct` для добавления товара и `removeProduct` для его удаления.

---

#### **Шаг 6: Подключение Redux к приложению**
Теперь подключим Redux к нашему приложению. Откройте файл `index.js` и обновите его:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

Теперь Redux подключен к приложению, и мы можем использовать состояние из хранилища. Обновим `App.js`, чтобы данные брались из Redux:

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';

function App() {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="App">
      <h1>My Product List</h1>
      <ProductList products={products} />
    </div>
  );
}

export default App;
```

Теперь данные о товарах берутся из Redux, и приложение готово к дальнейшему развитию.

---

#### **Заключение**
Мы создали базовое приложение на React, настроили Redux и подключили его к приложению. Теперь у нас есть основа, на которой мы будем строить дальнейшую функциональность: добавление, удаление и редактирование товаров, работа с API и многое другое. В следующем занятии мы углубимся в работу с состоянием и добавим новые функции.
