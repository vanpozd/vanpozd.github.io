import React from 'react';
import Image from './Image';

function GoodsCard({ name, price, image }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', textAlign: 'center' }}>
            <Image src={image} alt={name} />
            <h2>{name}</h2>
            <p>Ціна: {price} грн</p>
        </div>
    );
}

export default GoodsCard;
