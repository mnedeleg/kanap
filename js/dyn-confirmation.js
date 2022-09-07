// getting the basket order //
const url = new URL(location.href);
 const sendId = url.searchParams.get("orderId");

//get the id from the <span> and inject the order number
let orderNumber = document.getElementById('orderId');
orderNumber.textContent = sendId;

