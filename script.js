function emiCalculate() {
    // Declaring variables
    var loanAmount, loanTerm, rateOfInt, emiAmount, fragment, container, tempValue, interest, firstHeading, secondHeading, thirdHeading, fourthHeading, newWrapper, firstChild, secondChild, thirdChild, fourthChild, check;
    
    loanAmount = document.getElementById("amount").value;
    loanTerm   = document.getElementById("term").value;
    rateOfInt  = document.getElementById("rate").value;
    emiAmount  = document.getElementById("emi");
    fragment   = document.createDocumentFragment();
    container  = document.getElementById("monthly");
    check      = false;
    
    // Calculate the monthly EMI amount
    emiAmount.value = ((loanAmount * (rateOfInt / 1200)) / (1 - Math.pow((1 + (rateOfInt / 1200)), -loanTerm))).toFixed(2);
    
    // Stores the total principle in a temp variable
    tempValue = loanAmount;
    
    // We empty our container before processing next request.
    container.innerHTML = "";
    
    // Creating the required elements for adding the table headings
    firstHeading  = document.createElement("th");
    secondHeading = document.createElement("th");
    thirdHeading  = document.createElement("th");
    fourthHeading = document.createElement("th");
    
    // Populating the headings
    firstHeading.textContent  = "Monthly Installment";
    secondHeading.textContent = "Interest";
    thirdHeading.textContent  = "Principal";
    fourthHeading.textContent = "Balance";
    
    // Appending the headings to the fragment
    fragment.appendChild(firstHeading);
    fragment.appendChild(secondHeading);
    fragment.appendChild(thirdHeading);
    fragment.appendChild(fourthHeading);
    
    while (tempValue > 0) {
        // Creating the required elements
        newWrapper  = document.createElement("tr");
        firstChild  = document.createElement("td");
        secondChild = document.createElement("td");
        thirdChild  = document.createElement("td");
        fourthChild = document.createElement("td");
        
        // Check to see if the Balance is less than Monthly payment
        if ((emiAmount.value - tempValue) > 0) {
            check = true;
            firstChild.textContent  = (tempValue).toFixed(2);
        }
        
        // Calculate interest and the new loanAmount
        interest   = tempValue * (rateOfInt / 1200);
        tempValue  = tempValue - (emiAmount.value - interest);
        
        // Populating the newly created table entires with the required values
        // Check to ensure that we aren't on the last entry
        if (check === false) {
            firstChild.textContent  = Number(emiAmount.value).toFixed(2);
        }
        secondChild.textContent = (interest).toFixed(2);
        thirdChild.textContent  = (firstChild.textContent - interest).toFixed(2);
        fourthChild.textContent = (tempValue).toFixed(2);
        
        // Checking to see if our amount is in negative.
        if (fourthChild.textContent < 0) {
            fourthChild.textContent  = 0;
        }
        
        // Append the three entires to newWrapper
        newWrapper.appendChild(firstChild);
        newWrapper.appendChild(secondChild);
        newWrapper.appendChild(thirdChild);
        newWrapper.appendChild(fourthChild);
        
        // Append the newWrapper to the Document Fragment
        fragment.appendChild(newWrapper);
    }
    // Insert the document fragment into the table
    container.appendChild(fragment);
}