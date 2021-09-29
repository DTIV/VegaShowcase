import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom';
import Party from './Party';

const PARTY = gql`
    query parties{
        parties{
            id 
        }
    }
`;

const PartyList = (props) => {
    const { loading, error, data } = useQuery(PARTY, {
        pollInterval: props.updateMS ,
      });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return data.parties.filter((party) => props.currInput.toString() === party.id.toString() || props.currInput === 'all').map((party) => (
        <Link key={party.id} className="link" to={`/party/${party.id}`}>
            <Party party={party}/>
        </Link>
    ));
}

export default PartyList
