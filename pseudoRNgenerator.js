


/*
async function digestMessage(message){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hash;
}

async function sha256(message){
    const uint8_msg  = new TextEncoder().encode(message)
    const digest = await crypto.subtle.digest('SHA-256', uint8_msg)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('') // convert buffer to byte array then // convert bytes to hex string
}
*/
async function getAsyncPseudoRandomNumber(seedInStr, min, max){
    const encoder = new TextEncoder();
    const data = encoder.encode(seedInStr);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hash_decimal = Array.from(new Uint8Array(hash)).map(v => parseInt(v, 10)).join('')
    const result = min + hash_decimal % (max - min + 1)
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result);
    }, 100);
  });
}


(async ()=>{
  //https://eodhistoricaldata.com/api/eod/ETH-USD.CC?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&filter=last_close&order=d&fmt=json
  const eth_usd_rates = await fetch("https://eodhistoricaldata.com/api/eod/ETH-USD.CC?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&filter=last_close&order=d&fmt=json", {mode:"cors"})
  .then(response => response.text())
  const seed = eth_usd_rates;
  console.log(seed);
  const result = await getAsyncPseudoRandomNumber(seed, 0, 1000);
  const resultTxt = document.querySelector('.json_string');
  resultTxt.innerText = result;
  return;
})();

