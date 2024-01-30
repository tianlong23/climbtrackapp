// Define variables to store selected route value and popover element
let selectedRouteValue = 0;
const popoverContainer = document.querySelector('.popover-container');
const sentButton = document.querySelector('.sent-button');
const attemptedButton = document.querySelector('.attempted-button');
const cancelButton = document.querySelector('.cancel-button');

function showPopover() {
    popoverContainer.style.display = 'flex';
}

function hidePopover() {
    popoverContainer.style.display = 'none';
}

function handlePopoverButtonClick(action, routeValue) {
    console.log("typeof passed value: " + typeof(routeValue) + "actual value: " + routeValue)
    console.log('action value: ' + action + "typeof action value: " + typeof(action))
    // Update the table based on the selected action
    if (action === 'sent') {
        
        // Get the table body
        var tableBody = document.querySelector('.table tbody');

        // Create a new row
        var newRow = tableBody.insertRow();
        
        var currentDate = new Date().toLocaleDateString();
        
        // Add cells to the new row
        var dateCell = newRow.insertCell(0);
        var sendsCell = newRow.insertCell(1);
        var attemptsCell = newRow.insertCell(2);
        
        dateCell.innerText = currentDate;
        sendsCell.innerText = routeValue;
        attemptsCell.innerText = ""; 
    
        // Add a class to the date cell to hide it
        dateCell.classList.add('empty');

         // Update data summary
        updateDataSummary();

        // console.log("sent value " + value)

    } else if (action === 'attempted') {
        
        // Get the table body
        var tableBody = document.querySelector('.table tbody');

        // Create a new row
        var newRow = tableBody.insertRow();
        
        // Set values for the new row
        var currentDate = new Date().toLocaleDateString();
        
        // Add cells to the new row
        var dateCell = newRow.insertCell(0);
        var sendsCell = newRow.insertCell(1);
        var attemptsCell = newRow.insertCell(2);

        dateCell.innerText = currentDate;
        sendsCell.innerText = "";
        attemptsCell.innerText = routeValue; 

        // Add a class to the date cell to hide it
        dateCell.classList.add('empty');

        // Update data summary
        updateDataSummary();

        // console.log("attempted value " + value)
    }
    hidePopover();
    // value = null
}

function addRoute(value) {
    showPopover()
    console.log("typeof initial value: " + typeof(value) + "actual value: " + value)

    let routeValue = value


    // Define click event handlers for buttons
    function sentButtonClickHandler() {
        handlePopoverButtonClick('sent', routeValue);
        sentButton.removeEventListener('click', sentButtonClickHandler);
        attemptedButton.removeEventListener('click', attemptedButtonClickHandler);
        hidePopover();
    }

    function attemptedButtonClickHandler() {
        handlePopoverButtonClick('attempted', routeValue);
        attemptedButton.removeEventListener('click', attemptedButtonClickHandler);
        sentButton.removeEventListener('click', sentButtonClickHandler);
        hidePopover();
    }

    // Add event listeners to buttons
    sentButton.addEventListener('click', sentButtonClickHandler);
    attemptedButton.addEventListener('click', attemptedButtonClickHandler);
    
    cancelButton.addEventListener('click', hidePopover);
    
}

//NEED TO FIGURE OUT HOW TO NOT HAVE BLANK SPACES IN CELLS
//EXCEL EXPORT
//Add other grade
//add note
//UPDATE AND FINISH FORMATTING

function updateDataSummary() {
    
    // sends ---
    var sendsColumn = document.querySelectorAll('.table tbody td:nth-child(2)');
    var sendstotalRoutes = sendsColumn.length;
    var sendsTotalV = 0;
    var sendsMaxGrade = 0;

    sendsColumn.forEach(function (cell) {
        var value = parseInt(cell.innerText);
        sendsTotalV += value;
        sendsMaxGrade = Math.max(sendsMaxGrade, value);
    });

    var sendsAverageGrade = sendstotalRoutes > 0 ? sendsTotalV / sendstotalRoutes : 0;

    // Update summary values
    document.querySelector('.sends_total_routes').innerText = sendstotalRoutes;
    document.querySelector('.send_average_grade').innerText = sendsAverageGrade.toFixed(2);
    document.querySelector('.send_totalv').innerText = sendsTotalV;
    document.querySelector('.send_max_grade').innerText = sendsMaxGrade;

    // attempts -----
    var attemptsColumn = document.querySelectorAll('.table tbody td:nth-child(3)');
    var attemptstotalRoutes = attemptsColumn.length;
    var attemptsTotalV = 0;
    var attemptsMaxGrade = 0;

    attemptsColumn.forEach(function (cell) {
        var value = parseInt(cell.innerText);
        attemptsTotalV += value;
        attemptsMaxGrade = Math.max(attemptsMaxGrade, value);
    });

    var attemptsAverageGrade = attemptstotalRoutes > 0 ? attemptsTotalV / attemptstotalRoutes : 0;

    // Update summary values
    document.querySelector('.attempt_total_routes').innerText = attemptstotalRoutes;
    document.querySelector('.attempt_average_grade').innerText = attemptsAverageGrade.toFixed(2);
    document.querySelector('.attempt_total_v').innerText = attemptsTotalV;
    document.querySelector('.attempt_max_grade').innerText = attemptsMaxGrade;
}