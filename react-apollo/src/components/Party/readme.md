## PARTIES
-----------
Parties is the second main component to be rendered in this application. It contains the Parties Title and the PartySelect component

## PARTY SELECT
----------------
Party Select is a component that allows you to view all the parties available on vega, simply by typing the word 'all' or by entering your parties specific Party ID.

By using a react Hook to get the value of the form input to pass on to the PartyList component.

```
const [partyKey, setPartyKey ] = useState("")

<input className="party-input" onChange={(e) => setPartyKey(e.target.value)}/>

 <PartyList currInput={partyKey} updateMS ="60000" />

```

## PARTY LIST
--------------
PartyList component is similar to MarketsList component. A Query is made to GraphQL to get all the parties on Vega.
View the Query Schema: [here](https://docs.fairground.vega.xyz/api/graphql/query.doc.html)
```
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom';

const PARTY = gql`
    query parties{
        parties{
            id 
        }
    }
`;
```
Try The GraphQL code: [here](https://lb.testnet.vega.xyz/playground)

The query is then made with useQuery, and the data is then filtered by the users input passed in PartySelect.
The objects are then mapped and for each Party object an Link is created containing the Party component routing to the PartyData component.

```
const { loading, error, data } = useQuery(PARTY, {
        pollInterval: props.updateMS ,
      });

return data.parties.filter((party) => props.currInput.toString() === party.id.toString() || props.currInput === 'all').map((party) => (
        <Link key={party.id} className="link" to={`/party/${party.id}`}>
            <Party party={party}/>
        </Link>
    ));
```

## PARTY
Creates a div for each party that has been mapped. Party object is passed in at PartyList component

## PARTY DATA
A paramaterized GraphQL Query is made to get specific Party Data. Within PartyData component users can view account balances and types, positions and PNL metrics as well as governace proposals.
View Party Schema: [here](https://docs.fairground.vega.xyz/api/graphql/party.doc.html)
```
import { useQuery, gql } from "@apollo/client";

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
```

Party ID is then retrieved from the url, and the query is made.
```
var url = props.match.url;
var partyID = url.replace("party/","").replace("/", "")
const { loading, error, data } = useQuery(GET_PARTY_DATA, { variables : { partyID }});
```

There are three different tables for Accounts, Positions and Proposals components, each get there own relative data passed in from the query, and will be returned as a table rows.

## ACOUNTS
-----------
See Account Documentation: [here](https://docs.fairground.vega.xyz/api/graphql/account.doc.html)

Accounts takes the data passed and maps through all the results and return back to PartyData component

## POSTIONS
-----------
View Documentation for positions: [here](https://docs.fairground.vega.xyz/api/graphql/position.doc.html)

Positions takes the data passed and maps through all the results and return back to PartyData component


## PROPOSALS
------------
View the documentation for proposals: [here](https://docs.fairground.vega.xyz/api/graphql/proposal.doc.html)

Proposals takes the data passed and maps through all the results and return back to PartyData component