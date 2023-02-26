const submitBtn = document.getElementById("submit-btn");
const addBtn = document.getElementById("add-btn");
const form = document.getElementById("column-1");
const card = document.getElementById("column-2");
const formHidden = localStorage.getItem("formHidden") === "true";
const moneyLeft = document.getElementById("money-left-id");

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
	const budgetData = [];

	if (
		document.getElementById("income").value &&
		document.getElementById("savings").value
	) {
		const budget = {
			days: getMonthDays(new Date().getMonth()),
			income: parseInt(document.getElementById("income").value),
			savings: parseInt(document.getElementById("savings").value),
		};
		budgetData.push(budget);
		document.forms[0].reset();

		console.warn("added", { budgetData });

		localStorage.setItem("BudgetForm", JSON.stringify(budgetData));
		const retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm"));
		console.log(typeof retrievedBudgetForm[0].income);
		const result =
			retrievedBudgetForm[0].income - retrievedBudgetForm[0].savings;
		moneyLeft.innerText = result.toString();

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
		para2: para2,
	};
}
function subtractExpense(expenseVal) {
	const budgetData = [];
	const retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm")); // przypisuje do zmiennej retrievedBudgetForm obiekt BudgetForm
	console.log(retrievedBudgetForm);

	retrievedBudgetForm[0].expense = parseInt(expenseVal); // dodaje dynamiczne klucz expense i przypisuje mu wartosc expenseVal
	console.log(retrievedBudgetForm[0].expense);

	const result =
		retrievedBudgetForm[0].income -
		retrievedBudgetForm[0].savings -
		retrievedBudgetForm[0].expense;
	// potrzebuje, zeby to z powrotem wrocilo do local storage, zeby przy kolejnej iteracji wartosc wydatku odjela sie od zaktualizowanej wartosci
	// moneyleft - check
	document.getElementById("money-left-id").innerText = result.toString();
	const budget = {
		income: retrievedBudgetForm[0].income,
		savings: retrievedBudgetForm[0].savings,
		expense: retrievedBudgetForm[0].expense,
		moneyLeft: result,
	};
	budgetData.push(budget);
	console.log(budgetData);
	localStorage.setItem("BudgetForm", JSON.stringify(budgetData));
}

// kalkulacje musza byc robione na liczbach, a w obiekcie mamy zapisane stringi

function addExpense() {
	const { para, para2 } = createList();
	const expenseVal = document.getElementById("expense-value").value;
	const expenseCat = getCategory(
		document.getElementById("expense-category").value
	);
	subtractExpense(expenseVal);
	para.textContent = expenseVal;
	para2.textContent = expenseCat;
}

document.addEventListener("DOMContentLoaded", () => {
	submitBtn.addEventListener("click", addBudget);
	addBtn.addEventListener("click", addExpense);
});

// zapisac stan strony podczas ktorej wczytane sa dane pod i w karcie
// jezeli istnieje juz kategoria ktora dodaje w liscie, dodac wartosc do tego ekspensu
// konwerter waluty

// poprawic widok, na desktopie apka powinna byc na srodku, nie z lewej strony
