/* make it simple at first -

first stage - what do I need

a callback on addEventListener which is a submit button that will 
store inputs and then put them in the budget card

what is the formula on those two fields


*/
let budgetData = []
const addBudget = e => {
	e.preventDefault()

	if (
		document.getElementById('income').value &&
		document.getElementById('month').value &&
		document.getElementById('savings').value
	) {
		let budget = {
			id: Date.now(),
			income: document.getElementById('income').value,
			month: document.getElementById('month').value,
			savings: document.getElementById('savings').value,
		}
		budgetData.push(budget)
		document.forms[0].reset()

		console.warn('added', { budgetData })
		localStorage.setItem('BudgetForm', JSON.stringify(budgetData))
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('submit-btn').addEventListener('click', addBudget)
})

let retrievedBudgetForm = JSON.parse(localStorage.getItem('BudgetForm'));
console.log(retrievedBudgetForm[2].month)