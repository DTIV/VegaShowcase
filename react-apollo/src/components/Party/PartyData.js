import React from 'react'
import { useQuery, gql } from "@apollo/client";
import Accounts from './Accounts';
import Positions from './Positions';
import Proposals from './Proposals';
// GET PARTY DATA FROM QUERY
const GET_PARTY_DATA = gql`
    query PartyData($partyID: ID!) {
        party(id: $partyID){
            id
            accounts{
                balance
                type
                asset{
                    name
                }
            }
            positions{
                market{
                    name
                }
                realisedPNL
                unrealisedPNL
                averageEntryPrice
                updatedAt
            }
            proposals{
                id
                reference
                state
                datetime
            }
        }
    }`;

// GETTING DATA FROM PARTYLIST COMP, SENDING DATA TO ACCOUNTS AND POSITIONS COMP
const PartyData = (props) => {
    var url = props.match.url;
    var partyID = url.replace("party/","").replace("/", "")
    const { loading, error, data } = useQuery(GET_PARTY_DATA, { variables : { partyID }});
    if (loading) return null;
    if (error) return `Error! ${error}`;
    return (
        <section>
            <div className="line"></div>
            <div className="mrkt-info-wrap">
                <h4>Making a Vega GraphQL Query to list Party Data for this Party</h4><br/> 
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/query.doc.html" target="_blank">Query</a></p>
                <p><strong>Schema Information:</strong>  <a className="link" href="https://docs.fairground.vega.xyz/api/graphql/party.doc.html" target="_blank">Party</a></p>
                <p><strong>Apollo Information:</strong>  <a className="link" href="https://www.apollographql.com/docs/react/data/queries/" target="_blank">https://www.apollographql.com/docs/react/data/queries/</a></p>
                <div className="line"></div>
            </div>
            <h2 className="prty-header">Party Data</h2>
            <div className="table-wrap">
                <table className="prtydata-table">
                    <tbody>
                        <tr className="id-tr">
                            <th className="table-col">ID</th>
                            <td >{data.party.id}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="account-wrap">
                <h2 className="prty-header">Accounts</h2>
                <table>
                    <tbody>
                        <tr>
                            <th className="table-col">Asset</th>
                            <th className="table-col">Balance</th>
                            <th className="table-col">Type</th>
                        </tr>
                        <Accounts accounts={data.party.accounts}/>
                    </tbody>
                </table>
                
            </div>
            <div className="positions-wrap">
                <h2 className="prty-header">Positions</h2>
                <table className="prtydata-table">
                    <tbody>
                        <tr className="id-tr">
                            <th className="table-col">Name</th>
                            <th className="table-col">realisedPNL</th>
                            <th className="table-col">unrealisedPNL</th>
                            <th className="table-col">averageEntryPrice</th>
                            <th className="table-col">updatedAt</th>
                        </tr>
                        <Positions positions={data.party.positions}/>
                    </tbody>
                </table>
                
            </div>
            <div className="proposals-wrap">
                <h2 className="prty-header">Proposals</h2>
                <table className="prtydata-table">
                    <tbody>
                        <tr className="id-tr">
                            <th className="table-col">ID</th>
                            <th className="table-col">Reference</th>
                            <th className="table-col">State</th>
                            <th className="table-col">Date</th>
                        </tr>
                        <Proposals proposals={data.party.proposals} />
                    </tbody>
                </table>
                
            </div>
        </section>
    )
}

export default PartyData
