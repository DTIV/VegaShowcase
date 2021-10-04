## Markets
-----------
Markets is the first component section rendered in the app. Its components are used to list the Markets and get Market Data.
Markets renders the component MarketList and passes the poll interval duration in milliseconds to props.

## MarketsList
-----------------
MarketsList.js is where the first Query is made to Vega GraphQL server with a poll interval defined in Markets component.

First import required modules,
```
import { useQuery, gql } from "@apollo/client";
```

Then define the GraphQL Query.
```
const MARKETS = gql`
  query{
    markets{
      id
      name
      state
    }
  }
`;
```
Try The GraphQL code: [here](https://lb.testnet.vega.xyz/playground)


Next, The query is made:
```
const { loading, error, data } = useQuery(MARKETS, {
    pollInterval: props.updateMS ,
  });
```

The data that is returned from the query is then mapped, 
For each object returned from the Markets Query, a Market component is created.
The data from each object is passed to the Market component to render information such as the Market name, ID and state.

Each market component is wrapped in a Link, to route users to Market Data for that selected Market. For each Link, the Markets ID is passed in the route URL to access the Market Data at the destination component. In this case, MrktData.js
```
// App.js
<Route exact path="/:id" component={MrktData}/>

//MarketsList.js
return data.markets.map((market) => (
    <Link key={market.id} className="link" to={`${market.id}`}>
      <Market market={market}/>
    </Link>
  ));

```
Apollo Query Documentation: [here](https://www.apollographql.com/docs/react/data/queries/)

## Market Data
--------------
Once the user selects a market they are routed to the MrktData component. In this component we make a paramaterized Query to Vega GraphQL to get the specific Market Data. The specific Market Data is then organized into a table. Market Data renders PrepareOrder, OrderStream and TradeStream.

View Market Schema : [here](https://docs.fairground.vega.xyz/api/graphql/market.doc.html)
View Market Data Schema : [here](https://docs.fairground.vega.xyz/api/graphql/marketdata.doc.html)
```
import { useQuery, gql } from "@apollo/client";

const GET_MARKET_DATA = gql`
    query MarketData($marketID: ID!) {
        market(id: $marketID){
            id
            name
            decimalPlaces
            state
            data{
                bestBidPrice
                openInterest
                auctionStart
                auctionEnd
            }
            fees{
                factors{
                    makerFee
                    infrastructureFee
                    liquidityFee
                }
            }
        }
    }`;
```

With the market ID passed from the Link in MarketsList we get the specified data the user wants to query. 

First, we get the market ID from the URL
```
var url = props.match.url;
const marketID = url.replace("/","")
```

Then we make the query to GraphQL using the useQuery function, passing in the variables required.
```
const { loading, error, data } = useQuery(GET_MARKET_DATA, { variables : { marketID }});
```

Using the data returned from the Query, a table is built to display the market data.


