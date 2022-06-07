/* make it simple at first -

put data into the budget card



what is the formula on those two fields


*/
let budgetData = []
const getMonthDays = monthIndex => {
	let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	return monthDays[monthIndex]
}

function addBudget(e) {
	e.preventDefault()

	if (document.getElementById('income').value && document.getElementById('savings').value) {
		let budget = {
			days: getMonthDays(new Date().getMonth()),
			income: document.getElementById('income').value,
			savings: document.getElementById('savings').value,
		}
		budgetData.push(budget)
		document.forms[0].reset()

		console.warn('added', { budgetData })
		localStorage.setItem('BudgetForm', JSON.stringify(budgetData))

		let retrievedBudgetForm = JSON.parse(localStorage.getItem('BudgetForm'))
		document.getElementById('money-left-id').innerText = retrievedBudgetForm[0].income - retrievedBudgetForm[0].savings
		//  function above works but only for static website, if we have more entries than one this code will not run properly, i am aware of that but I wanted to use localStorage to show how to retrieve and save data in itself //
		document.getElementById('column-1').classList.toggle('d-none')
		document.getElementById('column-2').classList.toggle('d-none')
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('submit-btn').addEventListener('click', addBudget)
})

function addExpense() {
	let expenseVal = document.getElementById('expense-value').value
	let expenseCat = document.getElementById('expense-category').value

	// create a ul list that will have dynamically added expenses with values from variables above //

	const list = document.createElement('ul')
	
}
