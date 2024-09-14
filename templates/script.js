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
const monthContainer = document.querySelector(".month-container")
const yearContainer = document.querySelector(".year")
const yearTitleContainer = document.querySelector(".year-title")
const yearTitle = document.querySelector("h2")

let selectedDay;
let notes = {};

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
  monthContainer.style.display = "none"
  yearTitleContainer.style.display = "flex"
  yearTitle.textContent = `${year}`;
  for (let i = 0; i <= 11; i++){
    let daysContainerCopy = monthContainer.cloneNode(true)
    daysContainerCopy.style.display = "block"
    yearContainer.append(daysContainerCopy)
    showCalendar(i, year, daysContainerCopy, true)
  }
  let weekdays = document.querySelectorAll(".weekdays")
  weekdays.forEach(function(week){
    week.children[0].textContent = "D"
    week.children[0].style.width = "50px"
    week.children[1].textContent = "L"
    week.children[1].style.width = "50px"
    week.children[2].textContent = "M"
    week.children[2].style.width = "50px"
    week.children[3].textContent = "X"
    week.children[3].style.width = "50px"
    week.children[4].textContent = "J"
    week.children[4].style.width = "50px"
    week.children[5].textContent = "V"
    week.children[5].style.width = "50px"
    week.children[6].textContent = "S"
    week.children[6].style.width = "50px"
  })
}

function showCalendar(month, year, monthContainer = document.querySelector(".month-container"), showYear = false) {
  let container = monthContainer.querySelector(".days")
  monthYear = monthContainer.querySelector(".monthYear")
  container.innerHTML = "";
  if (showYear) {
    monthYear.textContent = `${months[month]}`
  } 
  else {
    monthYear.textContent = monthYear.textContent = `${months[month]} ${year}`;
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("prev-month");
    container.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.innerHTML = `<span>${day}</span>`;

    // Agregar evento para abrir el modal al hacer clic en el día
    dayDiv.addEventListener("click", () => openModal(day));

    // Resaltar el día actual
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

    // Mostrar nota si existe
    const noteKey = `${day}-${month}-${year}`;
    if (notes[noteKey]) {
      const noteSpan = document.createElement("div");
      noteSpan.classList.add("day-note");
      noteSpan.textContent = notes[noteKey];
      dayDiv.appendChild(noteSpan);
    }

    container.appendChild(dayDiv);
  }
}

function openModal(day) {
  selectedDay = day;
  selectedDateElement.textContent = `${day} ${months[currentMonth]} ${currentYear}`;
  noteText.value = notes[`${day}-${currentMonth}-${currentYear}`] || "";
  noteModal.style.display = "block";
}

// Cerrar modal
document.querySelector(".close").addEventListener("click", () => {
  noteModal.style.display = "none";
});

// Guardar nota
saveNoteButton.addEventListener("click", () => {
  const noteKey = `${selectedDay}-${currentMonth}-${currentYear}`;
  const noteValue = noteText.value.trim();

  if (noteValue) {
    notes[noteKey] = noteValue;
  } else {
    delete notes[noteKey];
  }

  noteModal.style.display = "none";
  showCalendar(currentMonth, currentYear);
});

// Navegar entre meses
prevBtn.addEventListener("click", () => {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener("click", () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  showCalendar(currentMonth, currentYear);
});

// Mostrar el calendario inicial
showCalendar(currentMonth, currentYear);
