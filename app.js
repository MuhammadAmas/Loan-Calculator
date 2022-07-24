document.getElementById('loan-form').addEventListener('submit', function (e) {

    //Hide results
    document.getElementById('results').style.display = 'none'
    //Show Loader
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults, 2000);

    e.preventDefault();

});

function calculateResults() {

    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const caculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly Payment Amount
    const x = Math.pow(1 + caculatedInterest, calculatedPayments);
    const monthly = (principal * x * caculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block'

        //hide loader 
        document.getElementById('loading').style.display = 'none'
    } else {
        showError('Please Check Your Numbers');
    }
}

// Show Error Message
function showError(error) {
    //hide results
    document.getElementById('results').style.display = 'none'

    //hide loader 
    document.getElementById('loading').style.display = 'none'

    const errorDiv = document.createElement('div');

    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    //add class
    errorDiv.className = 'alert alert-danger'

    //create Text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);

}

//clear error 
function clearError() {
    document.querySelector('.alert').remove();
}
