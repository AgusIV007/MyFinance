const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthContainer = document.querySelector(".month-container");
const daysContainer = document.getElementById("days");

const prevBtn = document.getElementById("previous-button");
const nextBtn = document.getElementById("next-button");

const infoItems = document.getElementById("item-title");
const monthTitleInfo = document.querySelector(".item-title");
const addInput = document.getElementById("add-input");
const addBtn = document.getElementById("add-button");

const yearContainer = document.querySelector(".year");

let showYear = true;
let showNotes = false;
let selectedDay;

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function showMonths(year) {}

function showCalendar(
  month,
  year,
  monthContainer = document.querySelector(".month-container")
) {
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

    dayDiv.innerHTML = `<span>${day}</span>`;
    dayDiv.classList.add("day");
    if (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      dayDiv.classList.add("today");
    } else {
      dayDiv.classList.remove("today");
    }
    container.appendChild(dayDiv);
  }
  const days = document.querySelectorAll(".day span");
  days.forEach(function (day) {
    day.addEventListener("click", function () {
      monthTitleInfo.textContent =
        getWeekDay(day.textContent) + " " + day.textContent;
    });
  });
}

function transitionMonth(month = currentMonth) {}

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

showCalendar(currentMonth, currentYear);

function addInfo(info) {
  const li = document.createElement("li");
  li.textContent = info;
  infoItems.append(li);
}

function getWeekDay(day) {
  switch (new Date(currentYear, currentMonth, day).getDay()) {
    case 0:
      return "Domingo";
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    case 3:
      return "Miercoles";
    case 4:
      return "Jueves";
    case 5:
      return "Viernes";
    case 6:
      return "Sabado";
  }
}

addBtn.addEventListener("click", function () {
  if (addInput.value.trim()) {
    addInfo(addInput.value);
  }
});
