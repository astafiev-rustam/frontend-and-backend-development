import React from 'react';
import UserList from './UserList.jsx';
import ProductSearch from './ProductSearch.jsx';
import PostList from './PostList.jsx';
import './App.css';

function App() {
  return (
    <div>
      <UserList />
      <ProductSearch />
      <PostList />
    </div>
  );
}

export default App;