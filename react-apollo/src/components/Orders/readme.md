## OrderStream
----------------
Order stream is rendered in the Market Data component. OrderStream is a component that utilizes GraphQL Subscriptions to get streaming Order Data from Vega. The data is organized into a table, and rows displays green or red depending on order side.
The Subscription incudes data for ID, price, side and size of an order. 

Ensure that the client has been created for a websocket connection.

See Apollo Docs: [here] (https://www.apollographql.com/docs/react/data/subscriptions/)
Subscription Schema : [here] (https://docs.fairground.vega.xyz/api/graphql/subscription.doc.html)

```
const GET_ORDERS = gql`
    subscription orderstream($marketID: ID!){
        orders(marketId: $marketID){
        id
        price
        side
        size
        }
    }
`
```
Try The GraphQL code: [here] (https://lb.testnet.vega.xyz/playground)

The Subscription is then initiated using the useSubscription function, using the specific market ID as a variable, passed in from the MrktData component.

```
const { loading, error, data } = useSubscription(GET_ORDERS, { variables: { marketID } });
```

The returned data is then filtered down to a maximum of 6 results at a time. Then the data is mapped into a table row for each of the objects returned from the subscription. Then the data is returned within a table inside the MrktData component.

## Prepare Order
-----------------
Prepare order is also rendered with the MrktData component. Within the PrepareOrder two Mutations are made to the GraphQL Server.

Import required modules, Then order is first prepared using prepareOrderSubmit in Mutations see [here](https://docs.fairground.vega.xyz/api/graphql/mutation.doc.html).

```
import { useMutation, gql } from "@apollo/client";

const PREPARE_ORDER = gql`
    mutation prepareOrder($market_id: ID!, $size: String!, $side: Side!){
        prepareOrderSubmit(
        marketId: $market_id
        size: $size
        side: $side
        timeInForce: FOK
        type: Market )
        {
            blob
        }
    }
`;
```

The useMutation function is then created as a variable under prepareOrder. 
Hooks will be defined to control state changes.
```
import { useState } from 'react'

const [size, setSize ] = useState("")
const [side, setSide ] = useState("Buy")
const [prepareOrder, { data, loading, error }] = useMutation(PREPARE_ORDER);
```

When the user submits the form, and defines a side, and size for the order, then the prepareOrder function is triggered with those variables.
```
<form action="" onSubmit={e => {
    e.preventDefault();
    if (!size){
        alert("Add Position Size!")
        return
    }
    prepareOrder({ variables: {market_id: props.marketID, size: size, side: side}})
}}>
```
If data is returned, the order is prepared and now the user is prompted to login to the wallet and submit the transaction.
Before we can submit the transaction, the raw TX must first be signed.
Documentation for creating a wallet: [here](https://docs.fairground.vega.xyz/docs/wallet/getting-started/)
OR
Creating a Wallet with Wallet API: [here] (https://docs.fairground.vega.xyz/wallet-api/)

React Hooks are added to get the value of the inputs.
```
const [wall, setWall ] = useState("")
const [pass, setPass ] = useState("")
```

When the user submits the transaction a async function is triggered
and a series of API calls are made to VEGA using fetch.

 
***1*** - **GET TOKEN**
The user logs in to there wallet and recieves a token.
See the documentation: [here] (https://docs.fairground.vega.xyz/wallet-api/#logging-in-to-a-wallet)
```
const url = " https://wallet.testnet.vega.xyz/api/v1/auth/token";
    const rawResponse = await fetch(url, {   
        method: 'POST',
        body: JSON.stringify({wallet: wall, passphrase: pass})
    });
    const token = await rawResponse.json();
```

***2*** - **GET KEYS**
Then the user gets there keys. If they dont have any keys, then keys are generated. We use the keys to access the pub Key and algorithm.
See the documentation for retrieving keys: [here] (https://docs.fairground.vega.xyz/wallet-api/#list-keys)
See the documentation for generating keys [here] (https://docs.fairground.vega.xyz/wallet-api/#generate-a-new-key-pair)

**GET KEYS**
```
const getKeysURL = "https://wallet.testnet.vega.xyz/api/v1/keys"
    const getKeys = await fetch(getKeysURL, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + token.token,
        },
    });
    const getKeysResponse = await getKeys.json();
    var keys = getKeysResponse.keys
```
**GEN KEYS**
```
    if(keys.length < 1){
        // GEN KEYS
        const genKeysURL = "https://wallet.testnet.vega.xyz/api/v1/keys"
        const genKeys = await fetch(genKeysURL, {
            method: 'POST',
            headers : {
                'Authorization': 'Bearer ' + token.token,
            },
            body: JSON.stringify({passphrase: pass}),
        });
        const genKeysResponse = await genKeys.json();
        var keys = genKeysResponse
    }
```
***3*** - **SIGN TRANSACTION**
Once the user has retrieved there keys, the pub Key is used to sign the transaction along with the raw TX from the prepared order.
```
 const signURL = "https://wallet.testnet.vega.xyz/api/v1/messages"
    const signTX = await fetch(signURL, {
        method: 'POST',
        headers : {
            'Authorization': 'Bearer ' + token.token,
        },
        body: JSON.stringify({tx: data.prepareOrderSubmit.blob, pubKey: keys[0].pub, propagate: false})
    });
    const signResponse = await signTX.json();
```

***4*** - **SUBMIT ORDER**
To submit the order a GraphQL Mutation will need to be made.

```
const SUBMIT_ORDER = gql`
    mutation submitOrder($data: String!, $sign: SignatureInput!){
        submitTransaction(
            data: $data
            sig: $sign
            ){
            success
        }
    }
`
```

The useMutation function is again assigned to a varible, submitOrder. 
A React Hook will also be added to monitor the state of the order.
```
const [order, setOrder] = useState(false)
const [submitOrder, { data, loading, error }] = useMutation(SUBMIT_ORDER);
```

Finally, The transaction is now ready to be submitted. Using the transaction and signature data the mutation is made, and the react Hook is set to true signalling a successful transaction to the user.
```
if(signResponse != null){
    const transaction = signResponse.signedTx.tx
    const signature =  signResponse.signedTx.sig
    const ss = submitOrder({ variables: {data: transaction, sign: signature}})
    ss.then(function (data) {
        setOrder(data.data.submitTransaction.success)
    })
```