const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthContainer = document.querySelector(".month-container");
const daysContainer = document.getElementById("days");

const prevBtn = document.getElementById("previous-button");
const nextBtn = document.getElementById("next-button");

const infoItems = document.getElementById("info-items");
const monthTitleInfo = document.querySelector(".item-title");
const addInput = document.getElementById("add-input");
const addBtn = document.getElementById("add-button");

const yearContainer = document.querySelector(".year");

let items = {
  2024: { 8: { 29: ["Gaste 1000 pesos", "hola"], 30: ["Robles es re puto"] } },
};

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
    let date = document.createElement("span");
    date.textContent = day;
    if (items[currentYear][currentMonth][day]) {
      let div = document.createElement("div");
      items[currentYear][currentMonth][day].forEach(function (info) {
        let span = document.createElement("span");
        span.textContent = info;
        div.append(span);
      });
      date.append(div);
    }
    dayDiv.append(date);
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
  const days = document.querySelectorAll(".day > span");
  days.forEach(function (day) {
    day.addEventListener("click", function () {
      monthTitleInfo.textContent =
        getWeekDay(day.textContent) + " " + day.textContent;
      for (let i = infoItems.children.length - 1; i >= 1; i--) {
        console.log(infoItems.children[i]);
        infoItems.children[i].remove();
      }
      let infoDay = getValues(infoMonth, day.textContent);
      if (infoDay) {
        infoDay.forEach(function (info) {
          let li = document.createElement("li");
          li.textContent = info;
          infoItems.append(li);
        });
      }
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

function getValues(currentItems, value) {
  return currentItems[value];
}

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
  let currentDay =
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 2] +
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 1];
  currentDay = currentDay.trim();
  if (items[currentYear][currentMonth][currentDay]) {
    items[currentYear][currentMonth][currentDay].push(info);
  } else {
    items[currentYear][currentMonth][currentDay] = [info];
  }
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
    addInput.value = "";
  }
});
