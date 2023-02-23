const submitBtn = document.getElementById("submit-btn");
const addBtn = document.getElementById("add-btn");
const form = document.getElementById("column-1");
const card = document.getElementById("column-2");
const formHidden = localStorage.getItem("formHidden") === "true";
const budgetData = [];
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
		const budget = {
			days: getMonthDays(new Date().getMonth()),
			income: document.getElementById("income").value,
			savings: document.getElementById("savings").value,
		};
		budgetData.push(budget);
		document.forms[0].reset();

		console.warn("added", { budgetData });

		localStorage.setItem("BudgetForm", JSON.stringify(budgetData)); // tworzymy pare klucz wartosc, w tym wypadku
		// kluczem jest BudgetForm a wartoscia jest budgetData

		const retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm"));
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

function createList() {
	const list = document.querySelector("ul");
	const listItem = document.createElement("li");
	const para = document.createElement("p");
	para.id = "expVal";
	const para2 = document.createElement("p");
	para2.id = "expCat";
	const btn = document.createElement("button");
	btn.classList.add("btn", "btn-danger");
	btn.textContent = "X";
	listItem.append(para, para2, btn);
	list.append(listItem);

	return {
		listItem: listItem,
		para: para,
		para2: para2
	}
}
function addExpense() {
	
	const {para, para2} = createList();
	const expenseVal = document.getElementById("expense-value").value;
	const expenseCat = getCategory(
		document.getElementById("expense-category").value
	);
	para.textContent = expenseVal;
	para2.textContent = expenseCat;


	// jak dodam ekspens, to chce zeby tworzyla sie nowa zmienna w obiekcie budgetform, ktora bede odejmowac od income, przez co pojawi mi sie kolejna wartosc money left -- ogarnac get i set item jak dziala na budgetform
}

document.addEventListener("DOMContentLoaded", () => {
	submitBtn.addEventListener("click", addBudget);
	addBtn.addEventListener("click", addExpense);
});

// 1 PROBLEM NARAZ

// zmienic dodawanie do local storage, zeby to mialo rece i nogi
