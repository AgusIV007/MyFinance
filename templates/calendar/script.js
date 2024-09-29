const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthContainer = document.querySelector(".month-container");
const daysContainer = document.getElementById("days");

const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");

const infoItems = document.getElementById("info-items");
const monthTitleInfo = document.querySelector(".item-title");
const addNumberInput = document.getElementById("add-number-input");
const addDescriptionInput = document.getElementById("add-description-input");
const addBtn = document.getElementById("add-btn");
const changeBtn = document.querySelector(".info-btn-change");

const changePanel = document.querySelector(".info-change-panel");
const changeOptions = document.querySelectorAll(".change-option");
const inputsContainer = document.querySelector(".info-inputs-container");

function hideChangePanel() {
  changePanel.classList.remove("displayed");
  changeBtn.children[0].classList.remove("rotate");
  changePanel.children[0].removeAttribute("style");
}

let items = {
  2024: {
    8: {
      29: [{ type: "Income", amount: 1000, description: "Pancho" }],
    },
  },
};

let showYear = true;
let showNotes = false;
let selectedDay;

const months = [
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

function showMonths(year) {}

function showCalendar(
  month,
  year,
  monthContainer = document.querySelector(".month-container")
) {
  let infoYear = getValues(items, currentYear);
  let infoMonth = getValues(infoYear, currentMonth);

  let monthTitle = document.querySelector(".month-title");
  let container = monthContainer.querySelector(".days");

  container.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  monthTitle.textContent = months[month] + " " + year;
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("prev-month");
    container.appendChild(emptyDiv);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    const infoDayContainer = document.createElement("div");
    let date = document.createElement("span");
    date.textContent = day;
    infoDayContainer.append(date);
    if (
      items[currentYear] &&
      items[currentYear][currentMonth] &&
      items[currentYear][currentMonth][day]
    ) {
      infoDayContainer.append(setDayBoxInfo(day));
    }
    dayDiv.append(infoDayContainer);
    dayDiv.classList.add("day");
    if (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      dayDiv.classList.add("today");
      let circle = document.createElement("span");
      circle.classList.add("today-circle");
      dayDiv.append(circle);
    } else {
      dayDiv.classList.remove("today");
    }
    container.appendChild(dayDiv);
  }
  const days = document.querySelectorAll(".day > div");
  days.forEach(function (day) {
    day.addEventListener("click", function () {
      setDayPanelInfo(infoMonth, day);
    });
  });
}

function addInfo(numberInfo, descriptionInfo) {
  setInfoItems(addNumberInput.placeholder, numberInfo, descriptionInfo);
  let currentDay =
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 2] +
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 1];
  currentDay = currentDay.trim();
  if (items[currentYear][currentMonth][currentDay]) {
    items[currentYear][currentMonth][currentDay].push({
      type: addNumberInput.placeholder,
      amount: numberInfo,
      description: descriptionInfo,
    });
  } else {
    items[currentYear][currentMonth][currentDay] = [
      {
        type: addNumberInput.placeholder,
        amount: numberInfo,
        description: descriptionInfo,
      },
    ];
  }
  showCalendar(currentMonth, currentYear);
}

function getNumberFormat(number) {
  number = String(number);
  let newNumberOrdered = "";
  let newNumberDot = "";
  let cont = 0;
  for (let i = number.length - 1; i >= 0; i--) {
    newNumberDot += number[i];
    cont++;
    if (i != 0 && cont % 3 == 0) {
      newNumberDot += ".";
      cont = 0;
    }
  }
  for (let i = newNumberDot.length - 1; i >= 0; i--) {
    newNumberOrdered += newNumberDot[i];
  }
  return newNumberOrdered + "$";
}
function getValues(currentItems, value) {
  return currentItems[value] ?? false;
}
function getWeekDay(day) {
  switch (new Date(currentYear, currentMonth, day).getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
function getTotalIncome(dayInfo) {
  let totalIncome = 0;
  dayInfo.forEach((info) => {
    if (info.type === "Income") {
      totalIncome += info.amount;
    }
  });
  return totalIncome === 0 ? false : totalIncome;
}
function getTotalExpenses(dayInfo) {
  let totalExpenses = 0;
  dayInfo.forEach((info) => {
    if (info.type === "Expenses") {
      totalExpenses += info.amount;
    }
  });
  return totalExpenses === 0 ? false : totalExpenses;
}
function getSymbol(type) {
  switch (type) {
    case "Expenses":
      return "-";
    case "Income":
      return "+";
  }
}

function setDayBoxInfo(day) {
  let div = document.createElement("div");
  let totalIncome = getTotalIncome(items[currentYear][currentMonth][day]);
  let totalExpenses = getTotalExpenses(items[currentYear][currentMonth][day]);
  if (totalIncome) {
    let span = document.createElement("span");
    span.innerHTML = "+ " + getNumberFormat(totalIncome);
    span.classList.add("income-data");
    div.append(span);
  }
  if (totalExpenses) {
    let span = document.createElement("span");
    span.innerHTML = "- " + getNumberFormat(totalExpenses);
    span.classList.add("expenses-data");
    div.append(span);
  }
  div.classList.add("day-info-container");
  return div;
}
function setDayPanelInfo(infoMonth, day) {
  monthTitleInfo.textContent =
    getWeekDay(day.querySelector("span").textContent) +
    " " +
    day.querySelector("span").textContent;
  for (let i = infoItems.children.length - 1; i >= 1; i--) {
    infoItems.children[i].remove();
  }
  let infoDay = getValues(infoMonth, day.querySelector("span").textContent);
  if (infoDay) {
    infoDay.forEach(function (info) {
      setInfoItems(info.type, info.amount, info.description);
    });
  }
}
function setInfoItems(type, amount, description) {
  let li = document.createElement("li");
  li.innerHTML = `<span class="${type.toLowerCase()}-data">${getSymbol(
    type
  )} ${getNumberFormat(
    amount
  )}</span><span class="description-data">${description}<span>`;
  li.classList.add("info-data");
  infoItems.append(li);
}

addBtn.addEventListener("click", function () {
  if (addNumberInput.value.trim()) {
    addInfo(parseInt(addNumberInput.value), addDescriptionInput.value);
    addNumberInput.value = "";
    addDescriptionInput.value = "";
  }
});
changeBtn.addEventListener("click", function () {
  changePanel.classList.toggle("displayed");
  changeBtn.children[0].classList.add("rotate");

  if (changePanel.classList.contains("displayed")) {
    changePanel.children[0].style.bottom = "0";
  } else {
    hideChangePanel();
  }
});

prevBtn.addEventListener("click", () => {
  if (showYear) {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  } else {
    currentYear--;
    showMonths(currentYear);
  }
});
nextBtn.addEventListener("click", () => {
  if (showYear) {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    showCalendar(currentMonth, currentYear);
  } else {
    currentYear++;
    showMonths(currentYear);
  }
});

document.addEventListener("click", function (e) {
  if (e.target != changePanel && e.target != changeBtn) {
    hideChangePanel();
  }
});

addNumberInput.addEventListener("keydown", function (e) {
  if (
    e.key != "Backspace" &&
    e.key != "ArrowLeft" &&
    e.key != "ArrowRight" &&
    e.key != "Delete"
  ) {
    e.preventDefault();
  }
  if (!isNaN(parseInt(e.key))) {
    addNumberInput.value += e.key;
  }
});

changeOptions.forEach(function (changeOption) {
  changeOption.addEventListener("click", function () {
    if (changePanel.classList.contains("displayed")) {
      inputsContainer.classList.remove("income");
      inputsContainer.classList.remove("expenses");
      inputsContainer.classList.remove("notes");
      addNumberInput.placeholder = changeOption.textContent;
      inputsContainer.classList.add(changeOption.textContent.toLowerCase());
      changeBtn.innerHTML =
        changeOption.textContent +
        "<i class='fa-solid fa-chevron-down info-btn-change-icon'></i>";
      hideChangePanel();
    }
  });
});

function transitionMonth(month = currentMonth) {}

showCalendar(currentMonth, currentYear);
