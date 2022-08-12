console.log(location.href)
       const url = new URL(location.href);
        const productId = url.searchParams.get("productId");
        // renvoie la première valeur avec le paramètre de recherche ==> "productId"
        console.log(productId)
      
  fetch("http://localhost:3000/api/products/" + productId)
      .then(res => res.json())
      .then(product => { 
    
          document.getElementById("title").innerHTML = product.name;
          document.getElementById("price").innerHTML = product.price;
          document.getElementById("description").innerHTML = product.description;


          let productImg = document.createElement("img");
          productImg.setAttribute("src", product.imageUrl);
          productImg.setAttribute("alt", product.altTxt);
          
          let images = document.getElementsByClassName("item__img")
          for (let i = 0; i < images.length; i++) {
            const element = images[i];
            element.appendChild(productImg);
            
          }

          console.log(product.colors);

          for (let i = 0; i < product.colors.length; i++) {
            const colorTab = product.colors[i];
          //  console.log("j'affiche la couleur" + colorTab)
             let option = document.createElement("option");
            option.setAttribute("value", colorTab);
            option.innerHTML = colorTab;

            document.getElementById("colors").appendChild(option);
   
          }


   
        }
    )
////////// enregistrement du panier dans le local storage //////////
  function saveBasket(basket){
      localStorage.setItem("basket",JSON.stringify(basket)); // clé + valeur // objet >> chaine de caractère
  }
  
  function getBasket (){
      let basket = (localStorage.getItem("basket"));
      if (basket == null){
          return []; // panier vide
      }else{
          return JSON.parse(basket); // sérialisation du tableau // chaine de caractères >> objet
      }
  }
  
  function addBasket (){
   console.log("on affiche le basket");
   console.log(productId);
      let basket = getBasket();
      console.log(basket);
      
      let colorEl = document.getElementById("colors");
      let color = colorEl.value;
      // let color = colorEl.options[colorEl.selectedIndex].value;
      let foundProduct = basket.find(p => p.id == productId && p.color == color);
      // find : chercher un élément dans un tableau par rapport à une condition
      let quantity = document.getElementById("quantity").value;


      if (foundProduct != undefined){ 
        foundProduct.quantity += parseInt(quantity);
        //parseInt va convertir une chaîne de caractère en nombre
        // et donc permettre les calculs
      }else{
        // productId.quantity = 1;
        // basket.push(productId);
        let item = {
          id : productId, 
          quantity : parseInt(quantity), 
          color : color
          
        }
        basket.push(item)
      }
      // ajout de item au reste du tableau "basket" -- à la fin
      saveBasket(basket);
      
      // basket sauvegardé sur le local storage
    
  }
  let btn = document.querySelector("#addToCart");
  btn.addEventListener("click", addBasket);

  
