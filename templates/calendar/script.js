const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const noteModal = document.getElementById("noteModal");
const noteText = document.getElementById("noteText");
const selectedDateElement = document.getElementById("selectedDate");
const saveNoteButton = document.getElementById("saveNote");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const monthContainer = document.querySelector(".month-container");
const yearContainer = document.querySelector(".year");
const yearTitleContainer = document.querySelector(".year-title");
const yearTitle = document.querySelector("h2");

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

function showMonths(year) {

}

function showCalendar(
  month,
  year,
  monthContainer = document.querySelector(".month-container")
) {
  let container = monthContainer.querySelector(".days");
  container.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("prev-month");
    container.appendChild(emptyDiv);
  }
  for (let day = 1; day <= daysInMonth + 1; day++) {
    const dayDiv = document.createElement("div");
    if (day == daysInMonth + 1){
      dayDiv.innerHTML = `<span></span>`;
    }
    else{
      dayDiv.innerHTML = `<span>${day}</span>`;
    }
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
}


function transitionMonth(month = currentMonth) {

}

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
