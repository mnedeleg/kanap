// getting back the product URL and productId key // Returning the Id //

const url = new URL(location.href);
 const productId = url.searchParams.get("productId");
 

 // fetch method with the specific product Id //
   fetch("http://localhost:3000/api/products/" + productId)
      .then(res => res.json())
      .then(product => { 
        
        //product name //
        document.getElementById("title").textContent = product.name;
        //product price //
        document.getElementById("price").textContent = product.price;
        //product descirption //
        document.getElementById("description").textContent = product.description;

        //product image //
        let productImg = document.createElement("img");
        productImg.setAttribute("src", product.imageUrl);
        productImg.setAttribute("alt", product.altTxt);
          
        let images = document.getElementsByClassName("item__img")
          for (let i = 0; i < images.length; i++) { 
            const element = images[i];
            element.appendChild(productImg);  
          }

        // product color / browsing color //
        for (let i = 0; i < product.colors.length; i++) {
          const colorTab = product.colors[i];
          
            let option = document.createElement("option");
            option.setAttribute("value", colorTab);
            option.textContent = colorTab;

            document.getElementById("colors").appendChild(option);
          }
        }
    )

    ////////// saving basket in local storage //////////

// function adding basket to local storage //
function saveBasket(basket){
  localStorage.setItem("basket",JSON.stringify(basket)); // key + value = objet >> string
    console.log(basket); 
}

// function getting basket from local storage
function getBasket (){
  let basket = (localStorage.getItem("basket"));
    console.log(basket);
  if (basket == null){
      return []; // empty array = empty basket
  }else{
      return JSON.parse(basket); // give a string >> objet // containing product details //
  }
}

// adding product //
function addBasket (){
  let basket = getBasket();
    console.log(basket);
  
  let colorEl = document.getElementById("colors");
  let color = colorEl.value;
  // find method // checking  if an element of the array has same Id and same color
  let foundProduct = basket.find(p => p.id == productId && p.color == color);
  let quantity = document.getElementById("quantity").value;


  if (foundProduct != undefined) { 
    foundProduct.quantity += parseInt(quantity); // convert a string > to number // Allow arithmetic opperation

  }else{
    let price = document.getElementById("price").textContent;
    let item = {
      id : productId, 
      quantity : parseInt(quantity), 
      color : color,
      price : price,
    }
    window.alert("Le(s) article(s) a(ont) bien été ajouté(s)")
    // add the product to basket
    if (parseInt(quantity) > 0 && parseInt(quantity) <= 100 && color != ""){
      basket.push(item) 
    }
  }
  // basket saved in local storage
  saveBasket(basket);
}

// when click => play function "addBasket" //
let btn = document.querySelector("#addToCart");
btn.addEventListener("click", addBasket);
