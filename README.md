# txFinalized()
An async method to detect if a Solana transaction is finalized or dropped.

Can be used with SolanaWeb3 in global scope or by importing the Connection method from the SolanaWeb3 module.

Takes into account all three commitment statuses for Solana transactions as outlined in Solana docs as well as initial null responses and possible null responses between status changes. 

[Solana Commitment Statuses](https://docs.solanalabs.com/consensus/commitments)

# Required
1. RPC Endpoint URL (string)
2. Transaction Signature (string)
3. Max Attempts (integer)
4. Seconds Between Attempts (integer)

# Usage
```javascript
// wait for a response from Solana for this signature, check 10 times max, and pause 4 seconds between checks.
let status = await txFinalized("YOUR_RPC_URL", "SOLANA_TX_SIGNATURE", 10, 4);
// if a status other than finalized is returned, handle the error and exit.
if(status != "finalized"){
  console.log("txFinalized Error: "+status);
  return;
}
// or once finalized, do more stuff.
console.log("Doing more stuff!");
```

# Method
```javascript
async function txFinalized(rpc,sig,max=10,int=4){
  return await new Promise(resolve => {
    let start = 1;
    let connection = null;
    if(typeof solanaWeb3 != "undefined"){
      connection = new solanaWeb3.Connection(rpc, "confirmed");
    }
    else{
      connection = new Connection(rpc, "confirmed");
    }
    let intervalID = setInterval(async()=>{
      let tx_status = null;
      tx_status = await connection.getSignatureStatuses([sig], {searchTransactionHistory: true,});
      console.log(start+": "+sig);
      if (tx_status != null && typeof tx_status.value != "undefined"){ 
        console.log(tx_status.value);
      }
      else{
        console.log("failed to get status...");
      }
      if (tx_status == null || 
      typeof tx_status.value == "undefined" || 
      tx_status.value == null || 
      tx_status.value[0] == null || 
      typeof tx_status.value[0] == "undefined" || 
      typeof tx_status.value[0].confirmationStatus == "undefined"){} 
      else if(tx_status.value[0].confirmationStatus == "processed"){
        start = 1;
      }
      else if(tx_status.value[0].confirmationStatus == "confirmed"){
        start = 1;
      }
      else if (tx_status.value[0].confirmationStatus == "finalized"){
        if(tx_status.value[0].err != null){
          resolve('program error!');
          clearInterval(intervalID);
        }
        resolve('finalized');
        clearInterval(intervalID);
      }
      start++;
      if(start == max + 1){
        resolve((max * int)+' seconds max wait reached');
        clearInterval(intervalID);
      }
    },(int * 1000));
  });  
}
```

# Details

• This js method will continually get a Solana transaction status every 4 seconds up to the defined max or deault 10 tries.

• If/when a "finalized" status is return from Solana, the method returns "finalized" as a string.

• Any other status returned should be gracefully handled as an error.

• Program errors return "program error!" but could also return error details with minimal modification.
