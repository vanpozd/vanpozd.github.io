import React from 'react';
import Header from './Header';
import Content from './Content';
import GoodsCard from './GoodsCard';

function App() {
    const goods = [
        { name: 'Viper', price: 100, image: '/images/1.png' },
        { name: 'Macat', price: 120, image: '/images/2.png' },
        { name: 'McQueen', price: 125, image: '/images/3.png' },
        { name: 'Invisible', price: 118, image: '/images/4.png' },
        { name: 'Roadster', price: 115, image: '/images/5.png' },
        { name: 'Flame', price: 110, image: '/images/6.png' }
    ];

    return (
        <div>
            <Header />
            <Content text="Товари магазину" />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {goods.map((item, index) => (
                    <GoodsCard key={index} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    );
}

export default App;
