function emiCalculate() {
    // Declaring variables
    var loanAmount, loanTerm, rateOfInt, emiAmount, fragment, container, tempValue, interest, newWrapper, firstChild, secondChild, thirdChild;
    
    loanAmount = document.getElementById("amount").value;
    loanTerm   = document.getElementById("term").value;
    rateOfInt  = document.getElementById("rate").value;
    emiAmount  = document.getElementById("emi").value;
    fragment   = document.createDocumentFragment();
    container  = document.getElementById("monthly");
    
    // Calculate the monthly EMI amount
    emiAmount = Math.round((loanAmount * (rateOfInt / 1200)) / (1 - Math.pow((1 + (rateOfInt / 1200)), -loanTerm)));
    
    // Stores the total principle in a temp variable
    tempValue = loanAmount;
    
    //We empty our container before processing next request.
    container.innerHTML = "";
    
    while (tempValue > 0) {
        // Calculate interest and the new loanAmount
        interest   = tempValue * (rateOfInt / 1200);
        tempValue  = tempValue - (emiAmount - interest);
        
        // Creating the required elements
        newWrapper  = document.createElement("tr");
        firstChild  = document.createElement("td");
        secondChild = document.createElement("td");
        thirdChild  = document.createElement("td");
        
        // Populating the newly created table entires with the required values
        firstChild.textContent  = Math.round(emiAmount);
        secondChild.textContent = Math.round(interest);
        thirdChild.textContent  = Math.round(tempValue);
        
        // Append the three entires to newWrapper
        newWrapper.appendChild(firstChild);
        newWrapper.appendChild(secondChild);
        newWrapper.appendChild(thirdChild);
        
        // Append the newWrapper to the Document Fragment
        fragment.appendChild(newWrapper);
    }
    // Insert the document fragment into the table
    container.appendChild(fragment);
}