async function mcstatus(rpc,sig,max=10,int=4){
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
