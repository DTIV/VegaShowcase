import React from 'react'
import Market from './Market';
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom';

// A COMPONENT OF ALL MARKETS IN A LIST WITH A LINK TO MARKETDATA

const MARKETS = gql`
  query{
    markets{
      id
      name
      state
    }
  }
`;

const MarketsList = (props) => {
  const { loading, error, data } = useQuery(MARKETS, {
    pollInterval: props.updateMS ,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.markets.map((market) => (
    <Link key={market.id} className="link" to={`${market.id}`}>
      <Market market={market}/>
    </Link>
  ));
}

export default MarketsList

