import React from 'react';
import './RestauranteCard.css';

interface RestaurantCardProps {
name: string;
description: string;
image: string;
  onClick?: () => void; // Adiciona a prop onClick
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, description, image, onClick }) => {
return (
    <div className="restaurant-card" onClick={onClick}> {/* Adiciona o onClick aqui */}
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p>{description}</p>
    </div>
);
};
