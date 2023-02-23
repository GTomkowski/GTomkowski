const submitBtn = document.getElementById("submit-btn");
const addBtn = document.getElementById("add-btn");
const form = document.getElementById("column-1");
const card = document.getElementById("column-2");
const formHidden = localStorage.getItem("formHidden") === "true";
let budgetData = [];
if (formHidden) {
	form.classList.add("d-none");
	card.classList.remove("d-none");
} else {
	form.classList.remove("d-none");
	card.classList.add("d-none");
}
function formToggle() {
	form.classList.toggle("d-none");
	card.classList.toggle("d-none");
	localStorage.setItem("formHidden", form.classList.contains("d-none"));
}

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

		localStorage.setItem("BudgetForm", JSON.stringify(budgetData)); // tworzymy pare klucz wartosc, w tym wypadku
		// kluczem jest BudgetForm a wartoscia jest budgetData, za kazdym razem

		let retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm"));
		document.getElementById("money-left-id").innerText =
			retrievedBudgetForm[0].income - retrievedBudgetForm[0].savings;
		//  function above works but only for static website, if we have more entries than one this code will not run properly, i am aware of that but I wanted to use localStorage to show how to retrieve and save data in itself //
		formToggle();
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
}

function removeListItem() {}

document.addEventListener("DOMContentLoaded", () => {
	submitBtn.addEventListener("click", addBudget);
	addBtn.addEventListener("click", addExpense);
});

// co ja chce zrobic?
// po dodaniu ekspensu, chce zeby wartosc w polu money left ubywalo zgodnie z dodanym ekspensem
