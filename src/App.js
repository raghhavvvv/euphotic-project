import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const togglePublished = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/dishes/${id}/toggle`);
      fetchDishes();
    } catch (error) {
      console.error('Error toggling dish status:', error);
    }
  };

  return (
    <div className="App">
      <h1>Dish Dashboard</h1>
      <div className="dish-container">
        {dishes.map(dish => (
          <div key={dish.dishId} className="dish-card">
            <h2>{dish.dishName}</h2>
            <img src={dish.imageUrl} alt={dish.dishName} className="dish-image" />            
            <p>Published: {dish.isPublished ? 'Yes' : 'No'}</p>
            <button onClick={() => togglePublished(dish.dishId)}>
              Toggle Published
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;