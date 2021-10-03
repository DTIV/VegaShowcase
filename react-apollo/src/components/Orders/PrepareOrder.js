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
    mutation submitOrder($data: String!, $sign: SignatureInput!){
        submitTransaction(
            data: $data
            sig: $sign
            ){
            success
        }
    }
`



const url = " https://wallet.testnet.vega.xyz/api/v1/auth/token";
const signOrder = (wallet, pass, blob) => {
    
    (async () => {
        // GET TOKEN
        const rawResponse = await fetch(url, {   
            method: 'POST',
            body: JSON.stringify({wallet: wallet, passphrase: pass})
        });
        const token = await rawResponse.json();
        //GET KEYS
        const getKeysURL = "https://wallet.testnet.vega.xyz/api/v1/keys"
        const getKeys = await fetch(getKeysURL, {
            method: 'GET',
            headers : {
                'Authorization': 'Bearer ' + token.token,
            },
        });
        const getKeysResponse = await getKeys.json();
        var keys = getKeysResponse.keys
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
        //SIGN
        const signURL = "https://wallet.testnet.vega.xyz/api/v1/messages"
        const signTX = await fetch(signURL, {
            method: 'POST',
            headers : {
                'Authorization': 'Bearer ' + token.token,
            },
            body: JSON.stringify({tx: blob, pubKey: keys[0].pub, propagate: false})
        });
        const signResponse = await signTX.json();
        localStorage.setItem("signResponse", JSON.stringify(signResponse))
    })();
}

const getTransaction = () => {
    if(localStorage.getItem("signResponse")){
        const trans = JSON.parse(localStorage.getItem("signResponse"))
        return trans.signedTx
    }
    return
}

var submittedTX = localStorage.getItem("submittedTX")
const getSuccess = (submittedTX) => {
    if(submittedTX){
        const txResponse = JSON.parse(submittedTX)
        const success = txResponse.data.submitTransaction.success
        // localStorage.removeItem("submittedTX")
        return success
    }else{
        console.log("NOTHING SET IN LOCAL STORAGE?")
    }
}
const PrepareOrder = (props) => {
    const [txData, setTxData] = useState(null)
    const [size, setSize ] = useState("")
    const [side, setSide ] = useState("Buy")
    const [wall, setWall ] = useState("")
    const [pass, setPass ] = useState("")
    
    const [prepareOrder, { data, loading, error }] = useMutation(PREPARE_ORDER);
    const [submitOrder, { subData, subLoading, subError }] = useMutation(SUBMIT_ORDER);
    
    if (loading) return 'Submitting...';
    
    if (error){
        console.log(error)
        return `Submission error! ${error.message}`;
    }
    
    if(txData){
        console.log("TX DATA", JSON.parse(txData))
    }
    if(data){
        return (
            <div className="submit-wrap">
                <h3 className="prep-header">ORDER PREPARED!</h3>
                <h4>Signing information: <a className="link" target="_blank" href="https://docs.fairground.vega.xyz/wallet-api/#sign-a-transaction">Here</a></h4>
                <h4>Submitted Transaction: <a className="link" target="_blank" href="https://docs.fairground.vega.xyz/api/graphql/transactionsubmitted.doc.html">Here</a></h4>
                <div className="rawTx">
                    <h4><strong>RAW TX:</strong></h4>
                    <p>{data.prepareOrderSubmit.blob}</p>
                </div>
                
                <form action="" onSubmit={e => {
                    e.preventDefault();
                    signOrder(wall, pass, data.prepareOrderSubmit.blob)
                    const signResponse = getTransaction() 
                    console.log("SIGN RSPONSE:",signResponse)
                    const ss = submitOrder({ variables: {data: signResponse.tx, sign: signResponse.sig}})
                    ss.then(function (data) {
                        var subTX = JSON.stringify(data)
                        setTxData(subTX)
                    })
                }}>
                    <div>
                        <input className="wall-input" id="wall" name="wall" type="text" placeholder="Enter Wallet" onChange={(e) => setWall(e.target.value)}/>
                    </div>
                    <div>
                        <input className="pass-input" id="pass" name="pass" type="password" placeholder="Enter Passphrase" onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <div className="subbtn-wrap">
                        <input className='btn btn-block submitorder-btn' type="submit" value="Submit Order"/>
                    </div>
                    <div className={`transaction ${txData === null ? 'hide': 'active'}`}>
                        Transaction Submitted Successfully!
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
