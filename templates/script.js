const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const noteModal = document.getElementById("noteModal");
const noteText = document.getElementById("noteText");
const selectedDateElement = document.getElementById("selectedDate");
const saveNoteButton = document.getElementById("saveNote");
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

function showCalendar(month, year) {
  daysContainer.innerHTML = "";
  monthYear.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("prev-month");
    daysContainer.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.innerHTML = `<span>${day}</span>`;

    // Agregar evento para abrir el modal al hacer clic en el día
    dayDiv.addEventListener("click", () => openModal(day));

    // Resaltar el día actual
    console.log(
      day,
      month,
      year,
      currentDate.getDate(),
      currentMonth,
      currentYear
    );
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

    daysContainer.appendChild(dayDiv);
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
document.querySelector(".prev").addEventListener("click", () => {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
});

document.querySelector(".next").addEventListener("click", () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  showCalendar(currentMonth, currentYear);
});

// Mostrar el calendario inicial
showCalendar(currentMonth, currentYear);
