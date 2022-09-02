const sendId = localStorage.getItem("sendId");
console.log(sendId);

let orderNumber = document.getElementById('orderId');
orderNumber.textContent = sendId;

// function removeLocalStorage (key){
//   localStorage.removeItem(key);
// };

// removeLocalStorage(sendId);
