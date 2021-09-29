import React from 'react'

const Party = (props) => {
    return (
        <div key={props.party.id} className="party">
            <div className="party-header">
                <h3>{props.party.id }</h3>
            </div>
        </div>
    )
}

export default Party
