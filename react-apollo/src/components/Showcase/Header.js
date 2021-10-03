import React from 'react'

// HEADER COMPONENT FOR LOGO AND TITLE

const Header = () => {
    return (
        <section className="header-wrap">
            <div className="logo">
               <h1>VEGA GRAPHQL</h1>
            </div>
            <h1 className="title">SHOWCASE APPLICATION</h1>
            <div>
                <p><strong>This application shows the power of the Vega GraphQL API.</strong> </p> <p>Market Data Querys, Live Order and Trade Data Streams with Subscriptions, and Prepare and Submit Orders with Mutations.</p> 
            </div>
            <div>
                <p><strong>Information Sources</strong></p>
                <p>
                    <strong>GraphQL Playground : </strong>
                     <a className="link" href="https://lb.testnet.vega.xyz/playground" target="_blank">https://lb.testnet.vega.xyz/playground</a>
                </p>
                <p>
                    <strong>Vega GraphQL Schema : </strong>
                     <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/" target="_blank">https://lb.testnet.vega.xyz/playground</a>
                </p>
                <p>
                    <strong>Apollo React : </strong>
                     <a className="link" href="https://www.apollographql.com/docs/react/get-started/" target="_blank">https://www.apollographql.com/docs/react/get-started/</a>
                </p>
            </div>
        </section>
    )
}

export default Header
