let form = document.querySelector('.cart__order__form');
console.log(form.firstName);

let input = document.querySelectorAll(".cart__order__form__question input");
input[0].setAttribute("data-errormsg", "firstNameErrorMsg");

////// First name /////

form.firstName.addEventListener('change', function(){
  validFirstName(this);
});

const validFirstName = function(inputFirstName){
  //creation regExp first name //
  let firstNameRegExp = new RegExp (
  '^[a-zA-Z-]{2,20}$', 'g'

  );

  let testFirstName = firstNameRegExp.test(inputFirstName.value);
  console.log(testFirstName)

  let errMessageId = inputFirstName.getAttribute("data-errormsg")
  let errorMessFirstName = document.getElementById(errMessageId)
  console.log(inputFirstName);
console.log(errorMessFirstName, errMessageId);
    if(testFirstName == true){
      return true;
    }else{
      errorMessFirstName.textContent = 'Prénom non valide';
      return false;
    }
      
  };

  ////// last name /////

form.lastName.addEventListener('change', function(){
  validLastName(this);
});

const validLastName = function(inputLastName){
  //creation regExp last name //
  let lastNameRegExp = new RegExp (
  '^[a-zA-Z-]{2,40}$', 'g'

  );

  let testLastName = lastNameRegExp.test(inputLastName.value);
  console.log(testLastName)
  let errorMessLastName = inputLastName.nextElementSibling;

    if(testLastName == true){
      return true;
    }else{
      errorMessLastName.textContent = 'Nom non valide';
      return false;
    }
      
  };

    ////// Address /////

form.address.addEventListener('change', function(){
  validAddress(this);
});

const validAddress = function(inputAddress){
  //creation regExp address //
  let addressRegExp = new RegExp (
  '^[a-zA-Z0-9- ]{5,100}$', 'g'
  );

  let testAddress = addressRegExp.test(inputAddress.value);
  console.log(testAddress)
  let errorMessAddress = inputAddress.nextElementSibling;

    if(testAddress == true){
      return true;
      
    }else{
      errorMessAddress.textContent = 'Adresse non valide';
      return false;
    }
      
  };

   ////// city /////

form.city.addEventListener('change', function(){
  validCity(this);
});

const validCity = function(inputCity){
  //creation regExp city //
  let cityRegExp = new RegExp (
  '^[a-zA-Z-]{2,40}$', 'g'

  );

  let testCity =cityRegExp.test(inputCity.value);
  console.log(testCity)
  let errorMessCity = inputCity.nextElementSibling;

    if(testCity == true){
      return true;
      
    }else{
      errorMessCity.textContent = 'Nom de la ville non valide';
      return false;
    }
      
  };
////// Email /////
form.email.addEventListener('change', function(){
  validEmail(this);
});

const validEmail = function(inputEmail){
 //creation regExp email //
  let emailRegExp = new RegExp (
  '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'

  );

  let testEmail = emailRegExp.test(inputEmail.value);
  console.log(testEmail)
  let errorMessEmail = inputEmail.nextElementSibling;

    if(testEmail == true){
      return true;
    }else{
      errorMessEmail.textContent = 'Adresse email non valide';
     return false;
    }
      
  };

  form.addEventListener("submit", function(e){
    e.preventDefault();
    if (validFirstName(form.firstName) 
      && validLastName(form.lastName) 
      && validAddress(form.address) 
      && validCity(form.city)
      && validEmail(form.email)){

// get ID'S + CONTACT //
        let contactForm ={
          firstName : firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value
        }
        let basket = JSON.parse(localStorage.getItem("basket"))
        let products = []
        for (let i = 0; i < basket.length; i++) {
          const product = basket[i];
         console.log(product);
         products.push(product.id);
        
      
        }
       
        let body = {
          contact: contactForm,
          products: products,
        }
        console.log(body);

        // sending info basket to confirmation page //
        fetch ("http://localhost:3000/api/products/order", {
          method :'POST',
          body: JSON.stringify(body),
          headers: {"Content-Type" : "application/json"}
        })
          .then(res => res.json())
          .then(cartOrder => {
            localStorage.removeItem("basket");
            window.location.href = "confirmation.html?orderId=" + cartOrder.orderId;
          })
  
    }else{
      
    }
  })