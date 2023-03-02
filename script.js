// form control variables
const form = document.getElementById("column-1");
const formTwo = document.getElementById("column-2");
const incomeInput = document.querySelector("#income");
const savingsInput = document.querySelector("#savings");
const expenseValueInput = document.querySelector("#expense-value");
const expenseCategorySelect = document.querySelector("#expense-category");

// variables for each of the functions - DOM manipulation and local storage

const submitBtn = document.getElementById("submit-btn");
const addBtn = document.getElementById("add-btn");
const formCard = document.getElementById("column-1");
const budgetCard = document.getElementById("column-2");
const formHidden = localStorage.getItem("formHidden") === "true";
const moneyLeft = document.getElementById("money-left-id");
let timestamp;

// codeblock that checks which form is hidden and adds classes + items on the index.html after each refresh

if (formHidden) {
	formCard.classList.add("d-none");
	budgetCard.classList.remove("d-none");
	const retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm"));
	moneyLeft.innerText = retrievedBudgetForm[0].moneyLeft.toString();
	displayExpenseItems();
} else {
	formCard.classList.remove("d-none");
	budgetCard.classList.add("d-none");
}
function formToggle() {
	formCard.classList.toggle("d-none");
	budgetCard.classList.toggle("d-none");
	localStorage.setItem("formHidden", formCard.classList.contains("d-none"));
}

// helper function to get

function getMonthName(monthIndex) {
	let monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return monthNames[monthIndex];
}

function addBudget() {
	// e.preventDefault();
	const budgetData = [];

	if (
		document.getElementById("income").value &&
		document.getElementById("savings").value
	) {
		const budget = {
			days: getMonthName(new Date().getMonth()),
			income: parseInt(document.getElementById("income").value),
			savings: parseInt(document.getElementById("savings").value),
		};
		budgetData.push(budget);
		document.forms[0].reset();

		console.warn("added", { budgetData });

		localStorage.setItem("BudgetForm", JSON.stringify(budgetData));
		// to jest tylko tablica [ { } ]
		const retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm"));
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

function createList(timestamp) {
	const list = document.querySelector("ul");
	const listItem = document.createElement("li");
	const para = document.createElement("p");
	para.id = "expVal";
	const para2 = document.createElement("p");
	para2.id = "expCat";
	const btn = document.createElement("button");
	btn.classList.add("btn", "btn-danger");
	btn.textContent = "X";
	btn.timestamp = timestamp; // chce zeby w funkcji createList utworzyc wlasciwosc timestamp
	// w przycisku i przypisac do niej wartosc timestampu
	btn.addEventListener("click", function () {
		// zalozmy, ze napisze to tak, jakby tego kodu nie bylo nigdzie indziej w skrypcie
		this.parentElement.remove();
		const retrievedBudgetForm = // pobieram retrievedBudgetForm
			JSON.parse(localStorage.getItem("BudgetForm")) || [];
		const result = (retrievedBudgetForm[0].moneyLeft +=
			retrievedBudgetForm[0].expense);
		moneyLeft.innerText = result.toString(); // dodaje sie expense do moneyleft, no bo usuwam wartosc
		const existingItems =
			JSON.parse(localStorage.getItem("expenseItems")) || [];

		const updatedItems = existingItems.filter(
			(item) => item.timestamp !== this.timestamp
		);
		localStorage.setItem("BudgetForm", JSON.stringify(retrievedBudgetForm));
		localStorage.setItem("expenseItems", JSON.stringify(updatedItems));
	});
	listItem.append(para, para2, btn);

	list.append(listItem);
	//
	return {
		para: para,
		para2: para2,
	};
}
function addExpense() {
	timestamp = Date.now();
	// dodalem parametr timestamp do funkcji addExpense
	const { para, para2 } = createList(timestamp); // najpierw wykonuje sie funkcja createList, tworzy sie element list item dodany do listy
	// funkcja zwraca zmienne para i para2 , czyli nasze stworzone paragrafy
	const expenseVal = document.getElementById("expense-value").value; // pobieram do zmiennej expenseVal wartosc z elementu o id expense-value
	const expenseCat = getCategory(
		document.getElementById("expense-category").value
	);
	subtractExpenseValue(expenseVal);
	para.textContent = expenseVal;
	para2.textContent = expenseCat;
	const expenseItem = {
		value: expenseVal,
		category: expenseCat,
		timestamp: timestamp,
	};

	const existingItems = JSON.parse(localStorage.getItem("expenseItems")) || [];
	existingItems.push(expenseItem);
	localStorage.setItem("expenseItems", JSON.stringify(existingItems));
}

function subtractExpenseValue(expenseVal) {
	const budgetData = [];
	let result;
	const retrievedBudgetForm = JSON.parse(localStorage.getItem("BudgetForm"));
	// pobieram do zmiennej retrievedBudgetForm tablice obiektow BudgetForm
	retrievedBudgetForm[0].expense = parseInt(expenseVal);
	if ("moneyLeft" in retrievedBudgetForm[0]) {
		result = retrievedBudgetForm[0].moneyLeft - retrievedBudgetForm[0].expense;
		moneyLeft.innerHTML = result.toString();
	} else {
		retrievedBudgetForm[0].moneyLeft =
			retrievedBudgetForm[0].income -
			retrievedBudgetForm[0].savings -
			retrievedBudgetForm[0].expense;
		result = retrievedBudgetForm[0].moneyLeft;

		moneyLeft.innerText = result.toString();
	}
	// 143-149 - commented out
	const budget = {
		income: retrievedBudgetForm[0].income,
		savings: retrievedBudgetForm[0].savings,
		expense: retrievedBudgetForm[0].expense,
		moneyLeft: result,
	};
	budgetData.push(budget);
	localStorage.setItem("BudgetForm", JSON.stringify(budgetData));
}

function displayExpenseItems() {
	// Get the list of expense items from local storage
	const expenseItems = JSON.parse(localStorage.getItem("expenseItems")) || [];

	// Loop through the list of expense items and create a new list item for each item
	expenseItems.forEach((expenseItem) => {
		const { para, para2 } = createList();
		para.textContent = expenseItem.value;
		para2.textContent = expenseItem.category;
	});
}

form.addEventListener("submit", (event) => {
	event.preventDefault();

	if (incomeInput.value.trim() === "") {
		alert("Please enter your monthly income.");
		incomeInput.focus();
		return;
	}

	if (savingsInput.value.trim() === "") {
		alert("Please enter how much you want to save this month.");
		savingsInput.focus();
		return;
	}

	// if all inputs are valid
	addBudget();
});
formTwo.addEventListener("submit", (event) => {
	event.preventDefault();

	if (expenseValueInput.value.trim() === "") {
		alert("Please enter the expense value.");
		expenseValueInput.focus();
		return;
	}

	if (expenseCategorySelect.value === "Choose expense category") {
		alert("Please choose an expense category.");
		expenseCategorySelect.focus();
		return;
	}

	addExpense();
});

// jezeli istnieje juz kategoria ktora dodaje w liscie, dodac wartosc do tego ekspensu
// konwerter waluty

// poprawic widok, na desktopie apka powinna byc na srodku, nie z lewej strony
