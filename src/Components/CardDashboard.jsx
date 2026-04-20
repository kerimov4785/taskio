import React, { useEffect, useState } from 'react'

function CardDashboard({ card }) {
    let [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    }, [])
    return (
        <div className="card">
            <div>
                <p>{windowWidth > 1024 ? card.title : card.title.split(' ')[0]}</p>
                <h3 style={{color: windowWidth > 1024 ? "var(--color-gray-900)" : card.hoverColor }} >{card.number}</h3>
            </div>
            <div className='card-icon' style={{background: card.color }} >
                {card.icon}
            </div>
            <div className='card-circle' style={{background: card.color }}></div>
        </div>
    )
}

export default CardDashboard