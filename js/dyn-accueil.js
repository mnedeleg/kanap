//get the API with fetch // 2 promises
console.log("bonjour 1 ", new Date())
fetch("http://localhost:3000/api/products")
  .then(res => res.json()) // getting data with JSON format
  .then(products => { // getting and using data (array)
   
    for (let i = 0; i < products.length; i++){ 
      const product = products[i]; 

      //article tag
      let articleProduct = document.createElement ("article");

      // h3 tag
      let name = document.createElement ("h3");
      name.textContent = product.name;
      name.classList.add("productName");
      articleProduct.appendChild(name);

      // image tag
      let imageUrl = document.createElement("img");
      imageUrl.setAttribute("src", product.imageUrl);
      imageUrl.setAttribute("alt", product.altTxt);
      articleProduct.appendChild(imageUrl);

      // description tag
      let description = document.createElement("p");
      description.textContent = product.description;
      description.classList.add("productDescription");
      articleProduct.appendChild(description);

      // giving key "productID" and parameter "product._id" // sending page /accueil.html to page /product.html 
      let productLink = "product.html?productId=" + product._id; 

      // link tag
      let linkProductContainer = document.createElement("a");
      linkProductContainer.appendChild(articleProduct);
      linkProductContainer.setAttribute("href", productLink); 
      document.getElementById("items").appendChild(linkProductContainer); 


  }
  
})
// In case there is a problem (API, server etc...) => catch //
  .catch((error)=>{
    console.log(error)
  })
