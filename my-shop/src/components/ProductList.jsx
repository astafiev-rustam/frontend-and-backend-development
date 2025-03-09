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