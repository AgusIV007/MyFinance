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

changeOptions.forEach(function (changeOption) {
  changeOption.addEventListener("click", function () {
    if (changePanel.classList.contains("displayed")) {
      inputsContainer.classList.remove("income");
      inputsContainer.classList.remove("expenses");
      inputsContainer.classList.remove("notes");
      inputsContainer.classList.add(changeOption.textContent.toLowerCase());
      changeBtn.innerHTML =
        changeOption.textContent +
        "<i class='fa-solid fa-chevron-down info-btn-change-icon'></i>";
    }
  });
});

let items = {
  2024: { 8: { 29: ["Gaste 1000 pesos", "hola"] } },
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
      let div = document.createElement("div");
      items[currentYear][currentMonth][day].forEach(function (info) {
        let span = document.createElement("span");
        span.innerHTML = info;
        div.append(span);
      });
      div.classList.add("day-info-container");
      infoDayContainer.append(div);
    }
    dayDiv.append(infoDayContainer);
    dayDiv.classList.add("day");
    if (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      dayDiv.classList.add("today");
      let circle = document.createElement("span")
      circle.classList.add("today-circle")
      dayDiv.append(circle)
    } else {
      dayDiv.classList.remove("today");
    }
    container.appendChild(dayDiv);
  }
  const days = document.querySelectorAll(".day > div");
  days.forEach(function (day) {
    day.addEventListener("click", function () {
      monthTitleInfo.textContent =
        getWeekDay(day.querySelector("span").textContent) +
        " " +
        day.querySelector("span").textContent;
      for (let i = infoItems.children.length - 1; i >= 1; i--) {
        console.log(infoItems.children[i]);
        infoItems.children[i].remove();
      }
      let infoDay = getValues(infoMonth, day.querySelector("span").textContent);
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
  return currentItems[value] ?? false;
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

function addInfo(numberInfo, descriptionInfo) {
  const li = document.createElement("li");
  li.textContent = numberInfo;
  infoItems.append(li);
  let currentDay =
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 2] +
    monthTitleInfo.textContent[monthTitleInfo.textContent.length - 1];
  currentDay = currentDay.trim();
  if (items[currentYear][currentMonth][currentDay]) {
    items[currentYear][currentMonth][currentDay].push(numberInfo);
  } else {
    items[currentYear][currentMonth][currentDay] = [numberInfo];
  }
  showCalendar(currentMonth, currentYear);
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

addBtn.addEventListener("click", function () {
  if (addNumberInput.value.trim()) {
    addInfo(addNumberInput.value, addDescriptionInput.value);
    addNumberInput.value = "";
    addDescriptionInput.value = "";
  }
});
changeBtn.addEventListener("click", function () {
  changePanel.classList.toggle("displayed");
  changeBtn.children[0].classList.toggle("rotate");

  if (changePanel.classList.contains("displayed")) {
    changePanel.children[0].style.bottom = "0";
  } else {
    changePanel.children[0].removeAttribute("style");
  }
});
