


export const progressListener = () => {

}


/*
let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')),
	checkboxesLength = checkboxes.length,
	progress = document.querySelector(".header-progress-bar"),
	counter = document.querySelector(".header-progress-count"),
	reset = document.querySelector(".header-reset-btn")

const checkboxValues = JSON.parse(localStorage.getItem(deployment)) || {},
	checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')),
	checkboxesLength = checkboxes.length,
	progress = document.querySelector(".header-progress-bar"),
	counter = document.querySelector(".header-progress-count"),
	reset = document.querySelector(".header-reset-btn")

//update the 'checkboxValues' localStorage item 
function updateStorage(a) {
	(checkboxValues[a.id] = a.checked),
		localStorage.setItem(deployment, JSON.stringify(checkboxValues));
}

//determine the number of checked list items, adjust progress bars and counters, and update storage
function countChecked() {
	if ("checkbox" === this.type) {
		const a = this.parentNode.parentNode.parentNode,
			b = a.querySelectorAll("input:checked").length / a.querySelectorAll(".checklist-item").length;
		a.querySelector(
			".checklist__percentage-border"
		).style.transform = `scaleX(${b})`;
	} else
		Array.from(document.querySelectorAll(".checklist")).forEach(a => {
			const b =
				a.querySelectorAll("input:checked").length / a.querySelectorAll(".checklist-item").length;
			a.querySelector(".checklist__percentage-border").style.transform = `scaleX(${b})`;
		});
	let a = 0;
	Array.from(document.querySelectorAll("input:checked")).forEach(() => { a += 1 }),
		(counter.innerText = `${a}/${checkboxesLength}`),
		(progress.style.transform = `scaleX(${a / checkboxesLength})`),
		(checkboxValues.globalCounter = a),
		updateStorage(this);
}

//load checklist values
function loadValues() {
	const a = checkboxValues.globalCounter || 0;
	(counter.innerText = `${a}/${checkboxesLength}`),
		Object.keys(checkboxValues).forEach(a => {
			"globalCounter" !== a && (document.getElementById(a).checked = checkboxValues[a]);
		}),
		countChecked();
}

//reset all checkboxes
function resetCheckboxes() {
	this.classList.add("header-reset-btn--pressed"),
		checkboxes.forEach(a => (a.checked = !1)),
		Object.keys(checkboxValues).forEach(a => delete checkboxValues[a]),
		countChecked();
}

//on window load, execute functions
window.onload = function () {
	loadValues(),
		checkboxes.forEach(a => a.addEventListener("click", countChecked)),
		reset.addEventListener("click", resetCheckboxes),
		reset.addEventListener("animationend", function () { this.classList.remove("header-reset-btn--pressed"); }, !1)
};
*/