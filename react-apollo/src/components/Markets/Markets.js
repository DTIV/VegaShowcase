import MarketsList from "./MarketsList"

// CONTAINER COMPONENT FOR MARKETLIST
const Markets = () => {
    return (
        <section className="market-wrap">
            <div className="headers-wrap">
                <h2 className="headers">Markets</h2>
                <div className="small-line"></div>
            </div>
            <div className="mrkt-info-wrap">
                Making a Query to list Markets from Vega GraphQL API so users can access Market Data
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/query.doc.html" target="_blank">https://docs.fairground.vega.xyz/api/graphql/query.doc.html</a></p>
                <p><strong>Apollo Information:</strong>  <a className="link" href="https://www.apollographql.com/docs/react/data/queries/" target="_blank">https://www.apollographql.com/docs/react/data/queries/</a></p>
                <div className="line"></div>
            </div>
            
            <MarketsList updateMS="60000"/>
        </section>
    )
}

export default Markets
