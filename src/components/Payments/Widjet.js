
export default function Widjet(data, signature,handleSubmitRes,isOrderId, price) {
    LiqPayCheckout.init({
        data: data,
        signature: signature,
        embedTo: "#liqpay_checkout",
        language: "en",
        mode: "embed" // embed || popup
    }).on("liqpay.callback", function(data){
        if(data.status == 'failure') {
            handleSubmitRes('pay_cancel', isOrderId, price)
        }
        else if (data.status != 'error') {
            handleSubmitRes('pay_done', isOrderId, price)
        }
        else {
            handleSubmitRes('pay_cancel', isOrderId, price)
        }
    }).on("liqpay.ready", function(data){

    }).on("liqpay.close", function(data){
        // setIsResult(false)
    });
}
