import React from 'react'

function CardDashboard({ card }) {
    return (
        <div className="card">
            <div>
                <p>{card.title}</p>
                <h3>{card.number}</h3>
            </div>
            <div className='card-icon' style={{background: card.color }} >
                {card.icon}
            </div>
            <div className='card-circle' style={{background: card.color }}></div>
        </div>
    )
}

export default CardDashboard