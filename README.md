# txFinalized
An async function to detect if a Solana transaction is finalized or dropped.

Assumes you have solanaWeb3 in global scope.



# Details

# Parameters
1. RPC Endpoint URL (string)
2. Transaction Signature (string)
3. Max Attempts (integer)
4. Pause Between Attempts (integer)

# Usage
• This js method will attempt to get an initial Solana transaction status of a signature up to 20 times with a Promise.
• If any status other than null is returned from Solana it will continue to wait for a "finalized" status up to the max.
• If/when a "finalized" status is return from Solana, the method returns "finalized" as a string.
• Any other status returned should be gracefully handled as an error.
• In some cases Solana returns "processed" status. When this happens the counter is reset to 1 and it will continue checking for a "finalized" status up to the max.
```javascript
// wait for a response from Solana for this signature, check 40 times max, and pause 4 seconds between checks.
let status = await txFinalized("https://rpc.helius.xyz/?api-key=YOUR_RPC_KEY","5pk3ra3AiCcYvnh2iyF9rBhzA8EdDEoXSo69PiZZDg8MFkHpENW2c1PYtSmyYadbAyqDLPrLitwa1PY6gUMo6Gis",40,4000);
// if a status other than finalized is returned, log the error and exit.
if(status!="finalized"){
  console.log("txFinalized Error: "+status);
  return;
}
// otherwise if finalized, do more stuff below.
console.log("Doing more stuff!");
```
