
/*DOM CONTENT LOADED HANDLER*/ 
document.addEventListener("DOMContentLoaded", () => {

 /*CONTACT FORM SUBMISSION*/
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showPopup("Thank you for your message! We'll get back to you soon.");
      contactForm.reset();
    });
  }

 
  /*ORDER FORM MODAL*/

  const orderBtn = document.getElementById("orderBtn");                  
  const orderModal = document.getElementById("orderModal");              
  const closeOrderModal = document.getElementById("closeOrderModal");  
  const deliveryOption = document.getElementById("deliveryOption");      
  const deliveryDetails = document.getElementById("deliveryDetails");    
  const orderForm = document.getElementById("orderForm");             

  const paymentMethod = document.getElementById("payment");              
  const creditCardField = document.getElementById("creditCardField");   
  const creditAmountInput = document.getElementById("creditAmount");    

  const productSelect = document.getElementById("product");            

  /*PRODUCT PRICE MAP*/
  const productPrices = {
    "marilog-natural": 305,
    "calinan-robusta": 305,
    "amai-washed": 405,
    "mtapo-natural": 405,
    "amai-honey": 405,
    "mtapo-honey": 405
  };

  /*CUSTOM POPUP ALERT*/

  const popupAlert = document.getElementById("popupAlert");              
  const popupMessage = document.getElementById("popupMessage");          
  const popupClose = document.getElementById("popupClose");             


  function showPopup(message, receiptHTML = "") {
    popupMessage.textContent = message;
    popupReceipt.innerHTML = receiptHTML;
    popupAlert.classList.remove("hidden");
  }


  popupClose.addEventListener("click", () => {
    popupAlert.classList.add("hidden");
  });

  /*SHOW MODAL ON "ORDER NOW"*/

  orderBtn.addEventListener("click", () => {
    orderModal.classList.remove("hidden");
  });


  /*CLOSE MODAL ON "CANCEL"*/

  closeOrderModal.addEventListener("click", () => {
    orderModal.classList.add("hidden");
  });

  /*TOGGLE DELIVERY ADDRESS FIELD*/ 

  deliveryOption.addEventListener("change", () => {
    if (deliveryOption.value === "delivery") {
      deliveryDetails.classList.remove("hidden");
    } else {
      deliveryDetails.classList.add("hidden");
    }
  });

  /*TOGGLE CREDIT CARD FIELD*/
  paymentMethod.addEventListener("change", () => {
    if (paymentMethod.value === "credit") {
      creditCardField.classList.remove("hidden");
    } else {
      creditCardField.classList.add("hidden");
    }
  });

  /*ORDER FORM SUBMISSION WITH VALIDATION*/ 
  
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedProduct = productSelect.value;
    const expectedPrice = productPrices[selectedProduct];

    if (!selectedProduct || !expectedPrice) {
      showPopup("Please select a valid product.");
      return;
    }

    if (paymentMethod.value === "credit") {
      const enteredAmount = parseFloat(creditAmountInput.value.trim());

      creditAmountInput.setCustomValidity("");

      if (isNaN(enteredAmount)) {
        creditAmountInput.setCustomValidity("Please enter a valid number.");
        creditAmountInput.reportValidity();
        return;
      }

      if (enteredAmount !== expectedPrice) {
        creditAmountInput.setCustomValidity(`Invalid Amount.`);
        creditAmountInput.reportValidity();
        return;
      }
    }

    /*BUILD RECEIPT MESSAGE*/

    const userName = document.getElementById("name").value.trim();
    const userEmail = document.getElementById("email").value.trim();
    const deliveryType = deliveryOption.value;
    const deliveryAddress = document.getElementById("address").value.trim();

    let receiptHTML = `
      <h4 style="margin-bottom: 1rem;"> Order Receipt</h4>
      <p><strong>Product:</strong> ${productSelect.options[productSelect.selectedIndex].text}</p>
      <p><strong>Price:</strong> ₱${expectedPrice}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod.value}</p>
      <p><strong>Option:</strong> ${deliveryType}</p>
      <p><strong>Name:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
    `;

    if (deliveryType === "delivery") {
      receiptHTML += `<p><strong>Address:</strong> ${deliveryAddress}</p>`;
    }

    receiptHTML += `<hr style="margin: 1rem 0;"><p> <em>Your order has been submitted! We'll contact you shortly.</em></p>`;

    /*SHOW RECEIPT POPUP*/

    showPopup("", receiptHTML);

    /**CLOSE ORDER MODAL*/

    orderModal.classList.add("hidden");

    orderForm.reset();
    deliveryDetails.classList.add("hidden");
    creditCardField.classList.add("hidden");
  });

  /*CLOSE MODAL IF CLICKED OUTSIDE FORM*/

  orderModal.addEventListener("click", (e) => {
    if (e.target === orderModal) {
      orderModal.classList.add("hidden");
    }
  });

});
