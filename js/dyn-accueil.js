fetch("http://localhost:3000/api/products")
//.then(function(response){  return response.json();
  .then(res => res.json()) 
  .then(products => {
    console.log(products) 
    for (let i = 0; i < products.length; i++){ 
      const product = products[i]; 
      console.log(product); 
  

    let articleProduct = document.createElement ("article");

    let name = document.createElement ("h3");
    name.textContent = product.name;
    name.classList.add("productName");
    articleProduct.appendChild(name);

    let imageUrl = document.createElement("img");
    imageUrl.setAttribute("src", product.imageUrl);
    imageUrl.setAttribute("alt", product.altTxt);
    articleProduct.appendChild(imageUrl);

    let description = document.createElement("p");
    description.textContent = product.description;
    description.classList.add("productDescription");
    articleProduct.appendChild(description);


    let productLink = "product.html?productId=" + product._id; 

    let linkProductContainer = document.createElement("a");
    linkProductContainer.appendChild(articleProduct);
    linkProductContainer.setAttribute("href", productLink); 
    document.getElementById("items").appendChild(linkProductContainer); 


  }
})