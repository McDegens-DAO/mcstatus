// verifies finalized status of signature
async function txFinalized(cluster,sig,max=40,milliseconds=4000){
  return await new Promise(resolve => {
    let start = 1;
    let connection = new solanaWeb3.Connection(cluster, "confirmed");
    let intervalID = setInterval(async()=>{
      console.log(start+": "+sig);
      let tx_status = await connection.getSignatureStatuses([sig], {searchTransactionHistory: true,});
      console.log(tx_status.value[0]);
      if(start > 20 && tx_status.value[0] == null){
        clearInterval(intervalID);
        console.log('Oh No! Something Happened!');
        resolve('Oh No! Something Happened!');
      }
      if (typeof tx_status == "undefined" || 
      typeof tx_status.value == "undefined" || 
      tx_status.value == null || 
      tx_status.value[0] == null || 
      typeof tx_status.value[0] == "undefined" || 
      typeof tx_status.value[0].confirmationStatus == "undefined"){} 
      else if (tx_status.value[0].confirmationStatus == "processed"){
        console.log('Transaction Processed!');
        start = 1;
      }
      else if(tx_status.value[0].confirmationStatus == "confirmed"){
        console.log('Transaction Confirmed!');
        start = 1;
      }
      else if (tx_status.value[0].confirmationStatus == "finalized"){
        console.log('Transaction Complete!');
        clearInterval(intervalID);
        resolve('finalized');
      }
      start++;
      if(start==max){
        clearInterval(intervalID);
        resolve(max+' max retrys reached');
      }
    },milliseconds);
  });  
}
