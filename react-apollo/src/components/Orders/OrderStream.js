import React from 'react'
import { useSubscription, gql } from "@apollo/client";


const GET_ORDERS = gql`
    subscription orderstream($marketID: ID!){
        orders(marketId: $marketID){
        id
        price
        side
        size
        }
    }
`

const OrderStream = (props) => {
    const marketID = props.marketID
    const { loading, error, data } = useSubscription(GET_ORDERS, { variables: { marketID } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;        
    return data.orders.filter((item, index) => index < 6).map((market) => (
    <tr key={market.id} className={`tr ${market.side === "Buy" ? 'buy': 'sell'}`}>
        <td>{market.side}</td>
        <td>{market.id}</td>
        <td>{Number(market.price/100000).toFixed(2)}</td>
        <td>{market.size}</td>
    </tr>));
}

export default OrderStream
