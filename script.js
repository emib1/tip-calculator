(function (){const services =[ {
        value: 1,
        title: "great - 20%"
      },
    
    {
        value: 2,
        title: "good - 10%"
      },

    {
        value: 3,
        title: "bad - 2%"
      } 
];


const validateInput =function(billNumber, pplNumber, selectedService){
    
    
    var isFeedback = false;
    const feedback = document.querySelector(".feedback");
    feedback.innerHTML = '';


    if (billNumber === "" || billNumber <="0"){
        feedback.classList.add('showItem');
        feedback.innerHTML += `<p>Bill amount cannot be blank</p>`
        isFeedback = true;  
    }

    if (pplNumber <=0){
        feedback.classList.add("showItem");
        feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
        isFeedback = true;  

    }

    if (selectedService === "0"){
        feedback.classList.add("showItem",);
        feedback.innerHTML += `<p>You must select a Service</p>`;
        isFeedback = true; 
    }

    setTimeout(function(){
        feedback.classList.remove('showItem',);
    }, 10000);

    return isFeedback;
};// end validateInput function
 



/*******calculate function******* */
    const calculateTip  =function(billNumber, pplNumber, selectedService){
       let percentTip ="";
       if (selectedService === "1"){
        percentTip =0.2;
       }
        else if (selectedService === "2"){
        percentTip =0.1;
       } 
       else{
        percentTip =0.02;
       }
       
       const tipAmount = Number(billNumber)*percentTip;
       const totalAmount = Number(billNumber) + Number(tipAmount);
       const eachPerson = Number(totalAmount) / Number(pplNumber);

       return[tipAmount, totalAmount,eachPerson];
    }
  // end calculate tip



  services.forEach(function(service){
    //create option
    const option = document.createElement('option');
    option.textContent =service.title;
    option.value = service.value;
    const select = document.querySelector("#service");
    select.appendChild(option)    
  })

   ////// form

   const form = document.querySelector('form');

   form.addEventListener('submit', function(e){
    e.preventDefault();

    /// bring html elements 

    const inputBill = document.querySelector('#billnumber');
    const inputPpl = document.querySelector('#pplnumber');
    const serviceValue = document.querySelector('#service');

   // brings thier inputted values
    let billNumber = inputBill.value;
    let pplNumber = inputPpl.value;
    let selectedService = serviceValue.value;




    //validate the input
   const isFeedback = validateInput(billNumber, pplNumber, selectedService) 
   if(!isFeedback){

   /******** html element********* */
   const loader = document.querySelector('.loading');
   const resultsDOM = document.querySelector('.results');
   const tipResultsDOM = document.querySelector('#tip-amount');
   const totalAmountDOM = document.querySelector('#total-amount');
   const eachPersonDOM = document.querySelector('#person-amount');


   /// calculate

   const results = calculateTip(billNumber, pplNumber, selectedService);
   loader.classList.add('showItem');
  /// addd timeout
   setTimeout(function(){
    loader.classList.remove('showItem');
    tipResultsDOM.textContent= `${results[0].toFixed(2)}`
    totalAmountDOM.textContent= `${results[1].toFixed(2)}`
    eachPersonDOM.textContent= `${results[2].toFixed(2)}`
    resultsDOM.classList.add('showItem');
  },2000)
  
  //clear values from DOM elements after 5 seconds
  setTimeout(function(){
    inputBill.value = '';
    inputUsers.value = '';
    serviceValue.value = 0;
    resultsDOM.classList.remove('showItem');
  }, 10000)
 

  }  //feedback statement
   
   }) //form statement
    
  
})();

