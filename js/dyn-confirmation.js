// get the order from local storage
const sendId = localStorage.getItem("sendId");
console.log(sendId);

//get the id from the <span> and inject the order number
let orderNumber = document.getElementById('orderId');
orderNumber.textContent = sendId;

// function removeLocalStorage (key){
//   localStorage.removeItem(key);
// };

// removeLocalStorage(sendId);
