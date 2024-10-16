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
    7: {
      10: [
        {
          type: "Income",
          amount: 1200,
          description: "Me prestó plata Pedrito",
        },
        {
          type: "Expenses",
          amount: 1200,
          description: "Me robaron lo que me prestó Pedrito",
        },
      ],
      15: [
        { type: "Income", amount: 500, description: "Venta de cosas usadas" },
        { type: "Expenses", amount: 200, description: "Cena en restaurante" },
      ],
      22: [
        { type: "Income", amount: 800, description: "Pago freelance" },
        { type: "Expenses", amount: 300, description: "Regalo para un amigo" },
      ],
    },
    8: {
      29: [
        { type: "Expenses", amount: 1000, description: "Compré un pancho" },
        {
          type: "Income",
          amount: 1500,
          description: "Devolución de impuestos",
        },
        { type: "Expenses", amount: 1300, description: "Compré una coca" },
        { type: "Expenses", amount: 1500, description: "Compré papas" },
        {
          type: "Income",
          amount: 2000,
          description: "Encontré plata en el piso",
        },
      ],
      5: [
        { type: "Expenses", amount: 400, description: "Gasolina" },
        { type: "Income", amount: 200, description: "Venta de libro usado" },
      ],
      17: [
        { type: "Expenses", amount: 700, description: "Mantenimiento auto" },
      ],
    },
    9: {
      10: [
        { type: "Income", amount: 1800, description: "Sueldo mensual" },
        { type: "Expenses", amount: 600, description: "Compra de ropa" },
      ],
      20: [
        { type: "Income", amount: 400, description: "Venta de bicicleta" },
        { type: "Expenses", amount: 250, description: "Cena con amigos" },
      ],
      30: [{ type: "Expenses", amount: 150, description: "Entrada cine" }],
    },
    10: {
      5: [
        { type: "Income", amount: 1000, description: "Pago por proyecto" },
        { type: "Expenses", amount: 300, description: "Regalo cumpleaños" },
      ],
      15: [{ type: "Income", amount: 600, description: "Venta de mueble" }],
      25: [
        {
          type: "Expenses",
          amount: 900,
          description: "Reparación computadora",
        },
      ],
    },
    11: {
      2: [
        { type: "Income", amount: 1200, description: "Reembolso de empresa" },
      ],
      12: [
        { type: "Expenses", amount: 150, description: "Comida rápida" },
        { type: "Income", amount: 300, description: "Devolución préstamo" },
      ],
      22: [{ type: "Expenses", amount: 200, description: "Salida al teatro" }],
    },
  },
};
console.log(data)
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

let showYear = true;
let showNotes = false;
let selectedDay;

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
function addNote(dataInput) {
  setNotesItems(dataInput);
  let currentDay =
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 2] +
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 1];
  currentDay = currentDay.trim();
  if (items[currentYear][currentMonth][currentDay]) {
    items[currentYear][currentMonth][currentDay].push({
      type: "Notes",
      note: dataInput,
    });
  } else {
    items[currentYear][currentMonth][currentDay] = [
      {
        type: "Notes",
        note: dataInput,
      },
    ];
  }
}
function addInfo(dataInput, descriptionInfo) {
  setInfoNumberItems(addNumberInput.placeholder, dataInput, descriptionInfo);
  let currentDay =
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 2] +
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 1];
  currentDay = currentDay.trim();
  if (items[currentYear][currentMonth][currentDay]) {
    items[currentYear][currentMonth][currentDay].push({
      type: addNumberInput.placeholder,
      amount: dataInput,
      description: descriptionInfo,
    });
  } else {
    items[currentYear][currentMonth][currentDay] = [
      {
        type: addNumberInput.placeholder,
        amount: dataInput,
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
  return "$" + newNumberOrdered;
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
  return totalIncome;
}
function getTotalExpenses(dayInfo) {
  let totalExpenses = 0;
  dayInfo.forEach((info) => {
    if (info.type === "Expenses") {
      totalExpenses += info.amount;
    }
  });
  return totalExpenses;
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
  if (totalIncome != 0) {
    let span = document.createElement("span");
    span.innerHTML = "+ " + getNumberFormat(totalIncome);
    span.classList.add("income-data");
    div.append(span);
  }
  if (totalExpenses != 0) {
    let span = document.createElement("span");
    span.innerHTML = "- " + getNumberFormat(totalExpenses);
    span.classList.add("expenses-data");
    div.append(span);
  }
  if (totalExpenses != 0 || totalIncome != 0) {
    let total = totalIncome - totalExpenses;
    let span = document.createElement("span");
    span.classList.add("total-data");

    if (total < 0) {
      total *= -1;
      span.classList.add("expenses-data");
      span.innerHTML = "- ";
    } else if (total > 0) {
      span.classList.add("income-data");
      span.innerHTML = "+ ";
    }

    span.innerHTML += getNumberFormat(total);

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
      if (info.type != "Notes") {
        setInfoNumberItems(info.type, info.amount, info.description);
      } else {
        setNotesItems(info.note);
      }
    });
  }
}
function setInfoNumberItems(type, amount, description) {
  let li = document.createElement("li");
  li.innerHTML = `<span class="${type.toLowerCase()}-data">${getSymbol(
    type
  )} ${getNumberFormat(
    amount
  )}</span><span class="description-data">${description}<span>`;
  li.classList.add("info-data");
  infoItems.append(li);
}
function setNotesItems(note) {
  let li = document.createElement("li");
  li.innerHTML = `<span class="notes-data">Note: ${note}</span>`;
  li.classList.add("info-data");
  infoItems.append(li);
}
addBtn.addEventListener("click", function () {
  if (addNumberInput.value.trim()) {
    if (addNumberInput.placeholder != "Notes") {
      addInfo(parseInt(addNumberInput.value), addDescriptionInput.value);
      addNumberInput.value = "";
      addDescriptionInput.value = "";
    } else {
      addNote(addNumberInput.value);
    }
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
  if (addNumberInput.placeholder != "Notes") {
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
      addNumberInput.value = "";
      addDescriptionInput.value = "";
    }
  });
});

function transitionMonth(month = currentMonth) {}

showCalendar(currentMonth, currentYear);
