/* make it simple at first -

put data into the budget card



what is the formula on those two fields


*/

const getMonthDays = monthIndex => {
	let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	return monthDays[monthIndex]
}

let budgetData = []
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
		document.getElementById('money-left-id').innerText = ` ${retrievedBudgetForm[0].income}`
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('submit-btn').addEventListener('click', addBudget)
	document.getElementById('submit-btn').addEventListener('click', () => {})
})


/*
let retrievedBudgetForm = JSON.parse(localStorage.getItem('BudgetForm'));
console.log(Date) - jak pobrac tresc z local storage */

/* jak rozwiazac ten problem?

co chce zrobic - chce zeby od razu po przeslaniu danych do local storage otrzymac */
