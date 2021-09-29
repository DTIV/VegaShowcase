import React from 'react'

const Proposals = (props) => {
    var counter = 323
    if (props.proposals){
        return props.proposals.map((market) => (
            <tr key={counter += 1}>
                <td>{market.id}</td>
                <td>{market.reference}</td>
                <td>{market.state}</td>
                <td>{market.datetime.split("T")[0]}</td>
            </tr>
            ));
    }
    return "No Proposals"
    
}

export default Proposals
