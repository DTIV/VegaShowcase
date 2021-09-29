import React from 'react'

// COMPONENT FOR INDIVIDUAL MARKET IN LIST - CALLED IS MARKETLIST
const Market = (props) => {
    return (
        <div key={props.market.id} className={`market ${props.market.state === "Active" ? 'active': props.market.state === 'Suspended' ? 'suspended': 'rejected'}`}>
            <div className="mrkt-header">
                <h3>{props.market.name}</h3>
                <p className="state-txt"><strong>{props.market.state}</strong> </p>
            </div>
            <p>{props.market.id}</p>
        </div>
    )
}

export default Market
