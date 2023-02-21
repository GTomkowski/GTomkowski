/* make it simple at first -

put data into the budget card



what is the formula on those two fields


*/
let budgetData = [];
function getMonthDays(monthIndex) {
	let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return monthDays[monthIndex];
}

function addBudget(e) {
	e.preventDefault();

	if (
		document.getElementById("income").value &&
		document.getElementById("savings").value
	) {
		let budget = {
			days: getMonthDays(new Date().getMonth()),
			income: document.getElementById("income").value,
			savings: document.getElementById("savings").value,
		};
		budgetData.push(budget);
		document.forms[0].reset();

		console.warn("added", { budgetData });
		localStorage.setItem("BudgetForm", JSON.stringify(budgetData));

		let retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm"));
		document.getElementById("money-left-id").innerText =
			retrievedBudgetForm[0].income - retrievedBudgetForm[0].savings;
		//  function above works but only for static website, if we have more entries than one this code will not run properly, i am aware of that but I wanted to use localStorage to show how to retrieve and save data in itself //
		document.getElementById("column-1").classList.toggle("d-none");
		document.getElementById("column-2").classList.toggle("d-none");
	}
}

function getCategory(categoryIndex) {
	let categories = ["", "Food", "Entertainment", "Utilities", "Others"];
	return categories[categoryIndex];
}

function addExpense() {
	let expenseVal = document.getElementById("expense-value").value;
	let expenseCat = getCategory(
		document.getElementById("expense-category").value
	);

	const list = document.querySelector("ul");
	const listItem = document.createElement("li");
	const para = document.createElement("p");
	para.id = "expVal";
	para.textContent = expenseVal;
	const para2 = document.createElement("p");
	para2.id = "expCat";
	para2.textContent = expenseCat;
	const btn = document.createElement("button");
	btn.classList.add("btn", "btn-danger");
	btn.textContent = "X";
	listItem.append(para, para2, btn);
	list.append(listItem);

	// what else do I want this function to do?

	//
}

function removeListItem() {}

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("submit-btn").addEventListener("click", addBudget);
	document.getElementById("add-btn").addEventListener("click", addExpense);
});

// container changes its width on each of the breakpoint

// using bootstrap container classes, I want a container to stay at a certain width after medium breakpoint, what is the class ?
