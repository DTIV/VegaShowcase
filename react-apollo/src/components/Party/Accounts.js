import React from 'react'

const Accounts = (props) => {
    var counter = 0
    return props.accounts.map((market) => (
        
    <tr key={counter += 1}>
        <td>{market.asset.name}</td>
        <td>{market.balance}</td>
        <td>{market.type}</td>
    </tr>
    ));
}

export default Accounts
