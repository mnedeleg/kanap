
// getting back the basket from local storage //
let basket = JSON.parse(localStorage.getItem("basket"))
  if (basket != undefined) { 
    
    const cartItems = document.getElementById("cart__items");

      //price and quantity setting //
      let totalPrice = 0;
      let totalQuantity = 0;
        for (let i = 0; i < basket.length; i++) {
          const element = basket[i];
          console.log(element)
          
          // fetch 
          fetch("http://localhost:3000/api/products/" + element.id)
            .then(res => res.json())
            .then(productLs => {
    
              let sousTotal = element.quantity * parseFloat(productLs.price);
              totalPrice += sousTotal;
            
              document.getElementById("totalPrice").textContent = totalPrice;
    
              let sousTotalQuantity = element.quantity;
              totalQuantity += sousTotalQuantity;
              document.getElementById("totalQuantity").textContent = totalQuantity;
    
              // create dynamic element on the page ir oder to display the basket //
              let article = document.createElement("article");
              article.setAttribute("class", "cart__item" );
              article.setAttribute("data-id", element.id);
              article.setAttribute("data-color", element.color);
    
              let cartItemImg = document.createElement("div");
              cartItemImg.setAttribute("class", "cart__item__img" );
              article.appendChild(cartItemImg);
    
              let productImg = document.createElement("img");
              productImg.setAttribute("src", productLs.imageUrl);
              productImg.setAttribute("alt", productLs.altTxt);
              cartItemImg.appendChild(productImg);
              
              let cartItemContent = document.createElement("div");
              cartItemContent.setAttribute("class", "cart__item__content");
              article.appendChild(cartItemContent);
    
              let cartItemContentDescription = document.createElement("div");
              cartItemContentDescription.setAttribute("class", "cart__item__content__description");
              cartItemContent.appendChild(cartItemContentDescription);
    
              let productName = document.createElement("h2");
              productName.textContent = productLs.name;
              cartItemContentDescription.appendChild(productName);
    
              let productColor = document.createElement("p");
              productColor.textContent = element.color;
              cartItemContentDescription.appendChild(productColor);
    
              let productPrice = document.createElement("p");
              productPrice.textContent = productLs.price;
              cartItemContentDescription.appendChild(productPrice);
    
              let cartItemContentSettings = document.createElement("div");
              cartItemContentSettings.setAttribute("class", "cart__item__content__settings");
              cartItemContent.appendChild(cartItemContentSettings);
    
              let cartItemSettingsQuantity = document.createElement("div");
              cartItemSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
              cartItemContentSettings.appendChild(cartItemSettingsQuantity);
    
              let quantityLabel =  document.createElement("p");
              quantityLabel.textContent = "Qté : ";
              cartItemSettingsQuantity.appendChild(quantityLabel);
    
    
              let quantityInput = document.createElement("input");
              quantityInput.setAttribute("type", "number");
              quantityInput.setAttribute("name", "itemQuantity");
              quantityInput.setAttribute("class", "itemQuantity");
              quantityInput.setAttribute("min", "1");
              quantityInput.setAttribute("max", "100");
              quantityInput.setAttribute("value", element.quantity);
              quantityInput.setAttribute("data-id", element.id);
              quantityInput.setAttribute("data-color", element.color);
              
              cartItemSettingsQuantity.appendChild(quantityInput);
    
              let cartItemSettingsDelete = document.createElement("div");
              cartItemSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
              cartItemContentSettings.appendChild(cartItemSettingsDelete);
    
              let deleteLabel = document.createElement("p");
              deleteLabel.setAttribute("class", "deleteItem");
              deleteLabel.textContent = "Supprimer";
              deleteLabel.setAttribute("value", element.quantity);
              deleteLabel.setAttribute("data-id", element.id);
              deleteLabel.setAttribute("data-color", element.color);
              cartItemSettingsDelete.appendChild(deleteLabel);
    
              cartItems.appendChild(article);
              
            })
          }  
    }else{
      console.log("Le panier est vide")
    }
    
//////// Removing Item from the cart ////////
        
// function saving basket to local storage //
function saveBasket(basket){
  localStorage.setItem("basket",JSON.stringify(basket)); 
  }

// function removing item from basket and local storage //  
function removeItem(cartItem){
  let basket = JSON.parse(localStorage.getItem("basket"))
  basket = basket.filter(p => (p.id != cartItem.id || p.id == cartItem.id)  && p.color != cartItem.color);
   
  saveBasket(basket);
}
    
// change quantity //

function changeQuantity(element, qtt){
  let basket = JSON.parse(localStorage.getItem("basket"))
  // find method // checking  if an element of the array has same Id and same color
  let foundProduct = basket.find(p => p.id == element.id && element.color == p.color);
  console.log(foundProduct);
  if (foundProduct != undefined){
    foundProduct.quantity = parseInt(qtt);
  }
    saveBasket(basket);
  } 

let refreshPrice = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  let totalPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < basket.length; i++) {
    const element = basket[i];
      let sousTotal = element.quantity * parseFloat(element.price);
      totalPrice += sousTotal;

      let sousTotalQuantity = element.quantity;
      totalQuantity += sousTotalQuantity;

  
  }
  console.log(totalPrice);
  document.getElementById("totalPrice").textContent = totalPrice;
  document.getElementById("totalQuantity").textContent = totalQuantity;
} 

window.onload = function() {
  //refresh  delete article //
  let deletedArticle = document.querySelectorAll(".deleteItem");
  console.log(deletedArticle);
  deletedArticle.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (e) => {
    let id = e.target.getAttribute("data-id");
    let color = e.target.getAttribute("data-color");
    let cartItem = {id, color};
    console.log("basket");
    removeItem(cartItem);
    refreshPrice();
    window.location.reload();
    })
  })
  
  
  let changeQuantityItem = document.querySelectorAll(".itemQuantity");
  changeQuantityItem.forEach(quantityArrow => {
    quantityArrow.addEventListener('change', (e) => {
    
    let id = e.target.getAttribute("data-id");
    let color = e.target.getAttribute("data-color");
    let item = {id, color};
    let qtt = e.target.value;
    if (parseInt(qtt) == 0){
      window.alert("Attention, vous devez définir une quantité entre 1 et 100");
      removeItem(item);
      location.reload();
       
    }else{
      changeQuantity(item, qtt);
    }
      refreshPrice();
    })
  })
}
