
    // Faire un fetch via local storage (getItem) pour récupérer le tableau (des éléments préalablement ajoutés) V
    // Parcourir le tableau avec une boucle qui charge les éléments du LS
    // Faire un fetch pour récuprérer les id des prodduits
    // Faire des "document.create" pour visualiser le panier ?

    let basket = JSON.parse(localStorage.getItem("basket"))
    if (basket != undefined) { // === nul ??
    
      const cartItems = document.getElementById("cart__items");
      let totalPrice = 0;
      let totalQuantity = 0;
        for (let i = 0; i < basket.length; i++) {
          const element = basket[i];
      
          fetch("http://localhost:3000/api/products/" + element.id)
            .then(res => res.json())
            .then(productLs => {
    
              let sousTotal = element.quantity * parseFloat(productLs.price);
              totalPrice += sousTotal;
            
            
              document.getElementById("totalPrice").textContent = totalPrice;
    
              let sousTotalQuantity = element.quantity;
              totalQuantity += sousTotalQuantity;
              document.getElementById("totalQuantity").textContent = totalQuantity;
        
    
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
          // Add an event listener on "supprimer" (class : deletedItem) on click
    
    function saveBasket(basket){
      localStorage.setItem("basket",JSON.stringify(basket)); 
      }
        
    function removeItem(cartItem){
      let basket = JSON.parse(localStorage.getItem("basket"))
      basket = basket.filter(p => (p.id != cartItem.id || p.id == cartItem.id)  && p.color != cartItem.color);
      
      saveBasket(basket);
      window.location.reload();
    }
    
    
    // change quantity //
    
    function changeQuantity(element, qtt){
      let basket = JSON.parse(localStorage.getItem("basket"))
      let foundProduct = basket.find(p => p.id == element.id && element.color == p.color);
      window.location.reload();
      console.log(foundProduct);
      if (foundProduct != undefined){
        foundProduct.quantity = parseInt(qtt);
        saveBasket(basket);
      } 
    
    }
    window.onload = function() {
      
      let deletedArticle = document.querySelectorAll(".deleteItem");
      console.log(deletedArticle);
      deletedArticle.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (e) => {
        let id = e.target.getAttribute("data-id");
        let color = e.target.getAttribute("data-color");
        let cartItem = {id, color};
        console.log("basket");
        removeItem(cartItem);
       
        })
      })
     
    
      let changeQuantityItem = document.querySelectorAll(".itemQuantity");
      changeQuantityItem.forEach(quantityArrow => {
        quantityArrow.addEventListener('click', (e) => {
        
        let id = e.target.getAttribute("data-id");
        let color = e.target.getAttribute("data-color");
        let item = {id, color};
        let qtt = e.target.value
       
       
    
        
         changeQuantity(item, qtt);
        //  SaveBasket(basket);
        })
      })
    }
    
    
    
  