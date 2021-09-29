import React from 'react'

const Positions = (props) => {
    var counter = 0;
    return props.positions.map((pos) => (
        <tr key={counter += 1}>
            <td>{pos.market.name}</td>
            <td>{pos.realisedPNL}</td>
            <td>{pos.unrealisedPNL}</td>
            <td>{pos.averageEntryPrice}</td>
            <td>{pos.updatedAt.split("T")[0]}</td>
        </tr>
        ));
}

export default Positions
