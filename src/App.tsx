import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchProducts, filterProducts, loadAllProducts } from './features/products/productsSlice';
import { selectProducts, selectFilteredProducts, selectLoading, selectError } from './features/products/productsSelector';
import Loader from './components/Loader/Loader';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>('price');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSelectProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]
    );
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price') {
      return b.price - a.price;
    } else if (sortOption === 'rating') {
      return b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  const compareProducts = (ev: React.MouseEvent) => {
    ev.preventDefault()
    dispatch(filterProducts(selectedProducts))
  };

  const fetchAllProducts = (ev: React.MouseEvent) => {
    ev.preventDefault()
    dispatch(loadAllProducts(products))
  };

  if (isLoading) return <Loader className="bg-gray-700 max-h-screen" />

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center py-4">
        <h1 data-testid="header" className="text-2xl font-bold text-gray-800">Product Comparison</h1>
        <div className="mt-4 flex flex-row justify-center items-center gap-x-4">
          <select
            data-testid="select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-600 rounded p-2 text-base text-gray-500"
          >
            <option data-testid="price" value="price">Sort by Price</option>
            <option data-testid="rating" value="rating">Sort by Rating</option>
          </select>
          {selectedProducts.length > 0 && (
            <>
            <button data-testid="filter-btn" className="border border-gray-600 rounded cursor-pointer p-2 bg-transparent text-base text-gray-800" onClick={compareProducts}>Filter products</button>
            <button data-testid="reset-btn" className="border border-gray-600 rounded cursor-pointer p-2 bg-transparent text-base text-gray-800" onClick={fetchAllProducts}>Load all products</button>
            </>
          )}
        </div>
      </header>
      <main>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                 data-testid={`product-${product.id}`}
                className={`bg-white shadow-md rounded-lg p-4 border-2 ${
                  selectedProducts.includes(product.id) ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => handleSelectProduct(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-2"
                />
                <h2 className="text-lg font-semibold text-gray-500 my-4">{product.title}</h2>
                <p className="text-gray-500 mb-3">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                <p className="text-sm text-cyan-500 mb-3 capitalize">{product.category}</p>
                <p className="text-sm text-yellow-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              </div>
            ))}
          </div>
        )}
        {selectedProducts.length > 0 && (
          <div data-testid="comparison-container" className="mt-6 bg-white p-4 shadow-md rounded-lg w-full border">
            <h2 className="text-xl font-bold text-gray-700">Selected Products for Comparison</h2>
            <table data-testid="comparison-table" className="w-full mt-4">
              <thead>
                <tr className="grid grid-cols-4 rounded-t-sm bg-transparent text-gray-500 border border-b-0 border-gray-500">
                  <th className="flex items-center justify-center text-base border-r border-gray-500">Title</th>
                  <th className="flex items-center justify-center text-base border-r border-gray-500">Price</th>
                  <th className="flex items-center justify-center text-base border-r border-gray-500">Rating</th>
                  <th className="flex items-center justify-center text-base">Count</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((id, idx) => {
                  const product = products.find((p) => p.id === id);
                  return product ? (
                  <tr className={`grid grid-cols-4 ${idx !== 0 ? 'border-t-0' : ''} border border-gray-500`}>
                    <td className="flex items-center justify-center text-base font-semibold text-gray-500 border-r border-gray-500 p-2 overflow-ellipsis">{product.title}</td>
                    <td className="flex items-center justify-center text-base font-semibold text-gray-500 border-r border-gray-500 p-2">£ {product.price.toFixed(2)}</td>
                    <td className="flex items-center justify-center text-base font-semibold text-gray-500 border-r border-gray-500 p-2">{product.rating.rate}</td>
                    <td className="flex items-center justify-center text-base font-semibold text-gray-500 p-2">{product.rating.count} reviews</td>
                  </tr>
                ) : null;
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer className="text-center py-4">
        <p className="text-gray-800">&copy; Copyright Emmanuel Ndibe</p>
      </footer>
    </div>
  );
};

export default App;