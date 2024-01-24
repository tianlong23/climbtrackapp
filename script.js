function addRoute(value) {
    // Get the table body
    var tableBody = document.querySelector('.table tbody');

    // Create a new row
    var newRow = tableBody.insertRow();

    // Add cells to the new row
    var dateCell = newRow.insertCell(0);
    var sendsCell = newRow.insertCell(1);
    var attemptsCell = newRow.insertCell(2);

    // Set values for the new row
    var currentDate = new Date().toLocaleDateString();
    dateCell.innerText = currentDate;
    sendsCell.innerText = value;
    attemptsCell.innerText = ""; // You may update this cell if needed

    // Add a class to the date cell to hide it
    dateCell.classList.add('empty');

    // Update data summary
    updateDataSummary();
}

//NEED TO FIND OUT WHY VALUES NOT UPDATING IN SUMMARY TABLE

function updateDataSummary() {
    var sendsColumn = document.querySelectorAll('.table tbody td:nth-child(2)');
    var totalRoutes = sendsColumn.length;
    var totalV = 0;
    var maxGrade = 0;
    var sumGrades = 0;

    sendsColumn.forEach(function (cell) {
        var value = parseInt(cell.innerText);
        totalV += value;
        sumGrades += value;
        maxGrade = Math.max(maxGrade, value);
    });

    var averageGrade = totalRoutes > 0 ? sumGrades / totalRoutes : 0;

    // Update summary values
    document.querySelector('.sends_total_routes').innerText = totalRoutes;
    document.querySelector('.send_average_grade').innerText = averageGrade.toFixed(2);
    document.querySelector('.send_totalv').innerText = totalV;
    document.querySelector('.send_max_grade').innerText = maxGrade;
}

