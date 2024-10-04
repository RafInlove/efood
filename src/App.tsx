import React, { useState, useEffect } from 'react';
import { RestaurantCard } from './components/RestaurantCard.tsx';
import { Modal } from './components/modal.tsx';
import './index.css';

interface Restaurant {
  id: number;
  nome: string;
  descricao: string;
  capa: string;
}

export const Rabanete: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchRestaurants() {
      const response = await fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes');
      const data = await response.json();
      setRestaurants(data);
    }

    fetchRestaurants();
  }, []);

  const openModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Efood</h1>
        <p>Escolha o seu restaurante favorito</p>
      </header>

      <section className="restaurant-container">
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            name={restaurant.nome}
            description={restaurant.descricao}
            image={restaurant.capa}
            onClick={() => openModal(restaurant)} // Abrir modal ao clicar no card
          />
        ))}
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedRestaurant && (
          <div className='modal'>
            <h2>{selectedRestaurant.nome}</h2>
            <p>{selectedRestaurant.descricao}</p>
            <img src={selectedRestaurant.capa} alt={selectedRestaurant.nome} />
          </div>
        )}
      </Modal>
    </div>
  );
};
