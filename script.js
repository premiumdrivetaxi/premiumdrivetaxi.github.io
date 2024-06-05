document.getElementById('addExpense').addEventListener('click', function() {
    addExpense('expenses');
});

document.getElementById('addExpenseNoCheck').addEventListener('click', function() {
    addExpense('expensesNoCheck');
});

document.getElementById('shiftDate').valueAsDate  = new Date();

function addExpense(expenseType) {
    const expenseDiv = document.createElement('div');
    expenseDiv.classList.add('expense-item');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Наименование расхода';
    nameInput.classList.add('expense-name');
    
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.placeholder = 'Сумма';
    amountInput.classList.add('expense-amount');
    amountInput.step = '0.01';
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.classList.add('remove-expense');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', function() {
        expenseDiv.remove();
    });
    
    expenseDiv.appendChild(nameInput);
    expenseDiv.appendChild(amountInput);
    expenseDiv.appendChild(removeButton);
    
    document.getElementById(expenseType).appendChild(expenseDiv);
}

document.getElementById('shiftForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startMileage = parseFloat(document.getElementById('startMileage').value);
    const endMileage = parseFloat(document.getElementById('endMileage').value);
    const cashEarnings = parseFloat(document.getElementById('cashEarnings').value);
    const cashlessEarnings = parseFloat(document.getElementById('cashlessEarnings').value);
    const privateEarnings = parseFloat(document.getElementById('privateEarnings').value);
    const privateCashInCar = parseFloat(document.getElementById('privateCashInCar').value);
    const totalCashInCar = parseFloat(document.getElementById('totalCashInCar').value);

		const date = document.getElementById('shiftDate').valueAsDate

		let privateCashEnd = privateCashInCar+privateEarnings;
    let CashEnd = totalCashInCar+cashEarnings;

    const totalMileage = endMileage - startMileage;
    const totalEarnings = cashEarnings + cashlessEarnings + privateEarnings;
    const performanceCoefficient = totalEarnings / totalMileage;

    let totalExpenses = 0;
    const expenseItems = document.querySelectorAll('#expenses .expense-item');
    let expenseDetails = '';
    expenseItems.forEach(item => {
        const name = item.querySelector('.expense-name').value;
        const amount = parseFloat(item.querySelector('.expense-amount').value);
        if (name && !isNaN(amount)) {
            totalExpenses += amount;
            expenseDetails += `\n${name}: ${amount.toFixed(2)} р`;
            CashEnd -= amount;
        }
    });

    let totalExpensesNoCheck = 0;
    const expenseNoCheckItems = document.querySelectorAll('#expensesNoCheck .expense-item');
    let expenseNoCheckDetails = '';
    expenseNoCheckItems.forEach(item => {
        const name = item.querySelector('.expense-name').value;
        const amount = parseFloat(item.querySelector('.expense-amount').value);
        if (name && !isNaN(amount)) {
            totalExpensesNoCheck += amount;
            expenseNoCheckDetails += `\n${name}: ${amount.toFixed(2)} р`;
            privateCashEnd -= amount;
        }
    });

    const report = `
    		Дата: ${date.toLocaleDateString("hi-IN")}
        Пробег в начале смены: ${startMileage.toFixed(2)} км
        Пробег в конце смены: ${endMileage.toFixed(2)} км
        Заработано наличными: ${cashEarnings.toFixed(2)} р
        Заработано безналичными: ${cashlessEarnings.toFixed(2)} р
        Заработано частными поездками: ${privateEarnings.toFixed(2)} р
        Общая сумма заработка: ${totalEarnings.toFixed(2)} р
        Расходы с чеком: ${expenseDetails.trim()}
        Расходы без чека: ${expenseNoCheckDetails.trim()}
        КПД: ${performanceCoefficient.toFixed(2)} р/км
        Наличные в машине от частных поездок в начале смены(Яндекс): ${privateCashInCar.toFixed(2)} р
        Всего наличных в машине в начале смены: ${totalCashInCar.toFixed(2)} р,
                Наличные в машине от частных поездок в конце смены: ${privateCashEnd.toFixed(2)} р
        Всего наличных в машине в конце смены(Яндекс): ${CashEnd.toFixed(2)} р
    `;

    document.getElementById('report').innerText = report.trim();
});
