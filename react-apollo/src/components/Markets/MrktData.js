import { useQuery, gql } from "@apollo/client";
import PrepareOrder from "../Orders/PrepareOrder";
// import OrderStream from "./Orders/OrderStream";
import OrderStream from "../Orders/OrderStream";
import { TradeStream } from "../Trades/TradeStream";

// GET MARKET DATA FROM HTTP QUERY
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


const MrktData = (props) => {
    var url = props.match.url;
    const marketID = url.replace("/","")
    const { loading, error, data } = useQuery(GET_MARKET_DATA, { variables : { marketID }});
    if (loading) return null;
    if (error) return `Error! ${error}`;
    var astart= 0;
    var aend = 0;
    if(data.market.data.auctionStart){
        astart = data.market.data.auctionStart
        astart = astart.split('T')[0]
    }
    if(data.market.data.auctionEnd){
        aend = data.market.data.auctionEnd
        aend = aend.split('T')[0]
    }
    return (
        <div>
            <div className="line"></div>
            <h2 className="mrktdata-header">{data.market.name}</h2>
            
            <div className="mrkt-state">
                <div className={`circle ${data.market.state === "Active" ? 'active': data.market.state === 'Suspended' ? 'suspended': 'rejected'}`}></div>
                <span>{data.market.state}</span>
            </div>
            <div className="mrkt-info-wrap">
                <h4>Making a Vega GraphQL Mutation to prepare an Order for {data.market.name} to be submitted to Vega.</h4><br/>
                <p><strong>Vega Wallet Information: </strong><a className="link" href="https://docs.fairground.vega.xyz/docs/wallet/getting-started/" target="_blank">Here</a></p>
                <p><strong>Schema Information: </strong><a className="link" href="https://docs.fairground.vega.xyz/api/graphql/mutation.doc.html" target="_blank">Mutations</a></p>
                <p><strong>Schema Information: </strong><a className="link" href="https://docs.fairground.vega.xyz/api/graphql/preparedsubmitorder.doc.html" target="_blank">Prepare Submit Order</a></p>
                <p><strong>Apollo Information: </strong><a className="link" href="https://docs.fairground.vega.xyz/api/graphql/mutation.doc.html" target="_blank">https://docs.fairground.vega.xyz/api/graphql/mutation.doc.html</a></p>
                <div className="line"></div>
            </div>
            <div className="prep-ordr">
                <PrepareOrder marketID={data.market.id}/>
            </div>
            <div className="mrkt-info-wrap">
                <h4>Making a Vega GraphQL Query to list Market Data for {data.market.name}.</h4><br/> 
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/query.doc.html" target="_blank">Query</a></p>
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/market.doc.html" target="_blank">Market</a></p>
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/marketdata.doc.html" target="_blank">Market Data</a></p>
                <p><strong>Apollo Information:</strong>  <a className="link" href="https://www.apollographql.com/docs/react/data/queries/" target="_blank">https://www.apollographql.com/docs/react/data/queries/</a></p>
                <div className="line"></div>
            </div>
            <table className="mkdata-table">
                <tbody>
                    <tr className="id-tr">
                        <th className="table-col">ID</th>
                        <td >{data.market.id}</td>
                    </tr>
                    <tr>
                        <th className="table-col">Decimals</th>
                        <td>{data.market.decimalPlaces}</td>
                    </tr>
                    <tr>
                        <th className="table-col">Best Bid</th>
                        <td>{data.market.data.bestBidPrice}</td>
                    </tr>
                    <tr>
                        <th className="table-col">Open Interest</th>
                        <td>{data.market.data.openInterest}</td>
                    </tr>
                    <tr>
                        <th className="table-col">Auction Start</th>
                        <td>{astart}</td>
                    </tr>
                    <tr>
                        <th className="table-col">Auction End</th>
                        <td>{aend}</td>
                    </tr>
                </tbody>
            </table>
            <div className="mrkt-info-wrap">
                <h4>Making a Vega GraphQL Subscription to stream Market Orders and Trades for {data.market.name}.</h4><br/> 
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/subscription.doc.html" target="_blank">Subscriptions</a></p>
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/order.doc.html" target="_blank">Order</a></p>
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/trade.doc.html" target="_blank">Trades</a></p>
                <p><strong>Apollo Information:</strong>  <a className="link" href="https://www.apollographql.com/docs/react/data/queries/" target="_blank">https://www.apollographql.com/docs/react/data/subscriptions/</a></p>
                <div className="line"></div>
            </div>
            <div className="orderstream-wrap">
                <h3 className="table-headers">Order Stream</h3>
                <div className="stream-table-wrap">
                    <table>
                        <tbody>
                            <tr>
                                <th>Side</th>
                                <th>ID</th>
                                <th>Price</th>
                                <th>Size</th>
                            </tr>
                            <OrderStream marketID={data.market.id}/>
                        </tbody>
                    </table>
                </div>    
            </div>
            <div className="tradestream-wrap">
                <h3 className="table-headers">Trade Stream</h3>
                <div className="stream-table-wrap">
                    <table>
                        <tbody>
                            <tr>
                                <th>Side</th>
                                <th>ID</th>
                                <th>Price</th>
                                <th>Size</th>
                            </tr>
                            <TradeStream marketID={data.market.id}/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
    );
}



export default MrktData
