export default function Widjet(data, signature,  setIsResult) {
    LiqPayCheckout.init({
        data: data,
        signature: signature,
        embedTo: "#liqpay_checkout",
        language: "ru",
        mode: "embed" // embed || popup
    }).on("liqpay.callback", function(data){
        console.log(data.status);
        if(data.status === 'failure') {setIsResult(false)}
        else {
            setIsResult(true)
        }
    }).on("liqpay.ready", function(data){

    }).on("liqpay.close", function(data){
        setIsResult(false)
    });
}
