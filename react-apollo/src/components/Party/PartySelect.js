import React from 'react'
import { useState } from 'react'
import PartyList from './PartyList'


const PartySelect = () => {
    // SET STATE OF INPUT
    const [partyKey, setPartyKey ] = useState("")
    return (
        <section>
            <form className="partyForm">
                <div className="form-control">
                    <input className="party-input" type="text" placeholder="Enter Public Key or 'all'" onChange={(e) => setPartyKey(e.target.value)}/>
                </div>
            </form>
            <div className="partylist-wrap">
                <PartyList currInput={partyKey} updateMS ="60000" />
            </div>
            
        </section>
        
    )
}

export default PartySelect
