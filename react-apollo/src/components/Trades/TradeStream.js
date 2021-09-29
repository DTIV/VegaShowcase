import React from 'react'
import { useSubscription, gql } from "@apollo/client";


const GET_TRADES = gql`
    subscription tradestream($marketID: ID!){
        trades(marketId: $marketID){
        id
        price
        type
        size
        }
    }
`

export const TradeStream = (props) => {
    const marketID = props.marketID
    const { loading, error, data } = useSubscription(GET_TRADES, { variables: { 
    marketID } });
    if (loading) return <p className="loading-trades">No Trades</p>;
    if (error) return <p>Error :(</p>;        
    
    return data.trades.filter((item, index) => index < 6).map((market) => (
        <tr key={market.id}>
            <td>{market.type}</td>
            <td>{market.id}</td>
            <td>{Number(market.price/100000).toFixed(2)}</td>
            <td>{market.size}</td>
        </tr>));
}
