
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import { useCartContext } from '../context/cartContext';


const Home = ({removeCookies}) => {
  const { setCart, cart } = useCartContext();
  const [products, setProducts] = useState([]);
 

  const nav = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await axios.get('https://fakestoreapi.com/products');
        console.log(productData);
        setProducts(productData.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []); 

  
 

    const handleLogout = () => {
      setCart([]); 
      removeCookies('authToken', '');
      nav('/');
    };
  return (
    <div className="w-full  flex flex-col bg-gray-500 items-center ">
      <nav className="w-full h-14 flex justify-between px-10 mt-8">
        <h1 className="text-3xl font-semibold mb-4">Home Page</h1>
        
        <Link to="/cart" cart={cart}>
         cart<span className='bg-green-500 text-white px-2 rounded-full'>{cart.length}</span>
        </Link>
      </nav>

     

   
      <button
            onClick={handleLogout}
            className="bg-red-500 ml-6 text-white h-10 px-2 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-red inline"
          >
            Logout
          </button>

      <div className="flex flex-wrap -mx-4">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            addToCart={() => setCart([...cart, product])}
            imgUrl={product.image}
            price={product.price}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;