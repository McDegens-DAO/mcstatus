# txFinalized
An async function to detect if a Solana transaction is finalized or dropped.
Assumes you have SolanaWeb3 in global scope.

# Details

# Parameters
1. RPC Endpoint URL (string)
2. Transaction Signature (string)
3. Max Attempts (integer)
4. Pause Between Attempts (integer)

# Usage
```javascript
let status = await txFinalized(
  "https://rpc.helius.xyz/?api-key=YOUR_RPC_KEY",
  "5pk3ra3AiCcYvnh2iyF9rBhzA8EdDEoXSo69PiZZDg8MFkHpENW2c1PYtSmyYadbAyqDLPrLitwa1PY6gUMo6Gis",
  40,
  4000
);
```
