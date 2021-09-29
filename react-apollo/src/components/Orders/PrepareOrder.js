import React from 'react'
import { useMutation, gql } from "@apollo/client";
import { useState } from 'react'

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

const SUBMIT_ORDER = gql`
    mutation submitOrder($data: String!, $sig: SignatureInput!){
        prepareOrderSubmit(
        data: $data
        sig: $sig
            ){
        blob
        }
    }
`

const url = " https://wallet.testnet.vega.xyz/api/v1/auth/token";

// FINISH WITH PROMISE AND  https://www.youtube.com/watch?v=DHvZLI7Db8E

const signOrder = (wallet, pass) => {
    (async () => {
        console.log(wallet)
        console.log(pass)
        // GET TOKEN
        const rawResponse = await fetch(url, {   
            method: 'POST',
            body: JSON.stringify({wallet: wallet, passphrase: pass})
        });
        const token = await rawResponse.json();
        console.log(token)
        //SIGN TX
        // const signTX = await fetch(url, {   
        //     method: 'POST',
        //     body: JSON.stringify({wallet: wallet, passphrase: pass})
        // });
        // const content = await signTX.json();
    })();
}

const PrepareOrder = (props) => {
    const [size, setSize ] = useState("")
    const [side, setSide ] = useState("Buy")
    const [wall, setWall ] = useState("")
    const [pass, setPass ] = useState("")

    const [prepareOrder, { data, loading, error }] = useMutation(PREPARE_ORDER);
    if (loading) return 'Submitting...';
    
    if (error){
        console.log(error)
        return `Submission error! ${error.message}`;
    }
    if(data){
        return (
        <div className="submit-wrap">
            <h3 className="prep-header">ORDER PREPARED!</h3>
            <h4>Signing information: <a className="link" target="_blank" href="https://docs.fairground.vega.xyz/wallet-api/#sign-a-transaction">Here</a></h4>
            <h4><strong>RAW TX:</strong></h4>
            <p>{data.prepareOrderSubmit.blob}</p>
            <form action="" onSubmit={e => {
                e.preventDefault();
                signOrder(wall, pass)
                
            }}>
                <div>
                    <input className="wall-input" id="wall" name="wall" type="text" placeholder="Enter Wallet" onChange={(e) => setWall(e.target.value)}/>
                </div>
                <div>
                    <input className="pass-input" id="pass" name="pass" type="text" placeholder="Enter Passphrase" onChange={(e) => setPass(e.target.value)}/>
                </div>
                <div className="subbtn-wrap">
                    <input className='btn btn-block submitorder-btn' type="submit" value="Submit Order"/>
                </div>
            </form>
        </div>
        )
    }

    return (
        <form action="" onSubmit={e => {
            e.preventDefault();
            if (!size){
                alert("Add Position Size!")
                return
            }
            prepareOrder({ variables: {market_id: props.marketID, size: size, side: side}})
        }}>
            <div className="form-control order-wrap" >
                <div>
                    <input className="posi-input" id="size" name="size" type="text" placeholder="Enter Position Size" onChange={(e) => setSize(e.target.value)}/>
                </div>
                
                <select className="side-select" name="side" id="side" onChange={(e) => setSide(e.target.value)}>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>
                <div>
                    <input className='sub-btn' type="submit" value="Prepare Order"/>
                </div>
                
            </div>
            
        </form>
    )
}

export default PrepareOrder
