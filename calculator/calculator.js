window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment

function setupIntialValues() {
  const initialValues = { initialamt: 10000, initialYears: 10, initialrate: 4.5};
  const amountInput = document.querySelector ("#loan-amount");
  const yearsInput = document.querySelector ("#loan-years");
  const rateInput = document.querySelector ("#loan-rate");

  //initialize them to a initial amount
  amountInput.value = initialValues.initialamt;
  yearsInput.value = initialValues.initialYears;
  rateInput.value = initialValues.initialrate;

  update();
}



// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentUserInput = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUserInput));

}



// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const principle = values.amount;
  const monthlyRate = (values.rate /100) /12; //i = periodic interest rate (in our case yearly rate ÷ 12)
  const n = Math.floor (values.years * 12) // n = total number of payments (years × 12)
  const numerator = (principle *monthlyRate)
  const denum = ( 1 - Math.pow ((1 + monthlyRate), -n))

  //Calculate monthly payment
  return ( numerator / denum).toFixed(2);



}

function updateMonthly(monthly) {
  const monthlyUserPayment = document.getElementById("monthly-payment");
  monthlyUserPayment.innerText = "$" + monthly;
}