## TradeStream
--------------
TradeStream is similar to the OrderStream component. TradeStream is rendered in the Market Data component. TradeStream is a component that utilizes GraphQL Subscriptions to get streaming Trade Data from Vega. 
The Subscription incudes data for ID, price, type and size of an trade. 

Ensure that the client has been created for a websocket connection.

See Apollo Docs: [here] (https://www.apollographql.com/docs/react/data/subscriptions/)
Subscription Schema : [here] (https://docs.fairground.vega.xyz/api/graphql/subscription.doc.html)

View Trade Schema: [here] (https://docs.fairground.vega.xyz/api/graphql/trade.doc.html)


Once the client connection is created for subscriptions, import the required modules and create a GraphQL subscription.
```
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
```
Try The GraphQL code: [here] (https://lb.testnet.vega.xyz/playground)

The returned data is then filtered down to a maximum of 6 results at a time. Then the data is mapped into a table row for each of the objects returned from the subscription. Then the data is returned within a table inside the MrktData component.
