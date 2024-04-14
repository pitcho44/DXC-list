let scheduleData = {};

async function fetchScheduleData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    scheduleData = await response.json();
    generateTable();
  } catch (error) {
    console.error('Error fetching schedule data:', error);
  }
}

fetchScheduleData();

const headerRow = document.getElementById('header-row');
const scheduleBody = document.getElementById('schedule-body');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');

let currentWeek = 0;

function generateTable() {
  const currentWeekData = Object.entries(scheduleData)[currentWeek][1];
  
  // Génère les colonnes du tableau
  const columns = ['Fonctionnaire', ...Object.keys(currentWeekData[0]).slice(1)];
  headerRow.innerHTML = columns.map(col => `<th>${col}</th>`).join('');

  // Génère les lignes du tableau
  scheduleBody.innerHTML = currentWeekData.map(row => {
    return `<tr>${columns.map(col => `<td>${row[col] || '-'}</td>`).join('')}</tr>`;
  }).join('');
}

prevWeekBtn.addEventListener('click', () => {
  if (currentWeek > 0) {
    currentWeek--;
    generateTable();
  }
});

nextWeekBtn.addEventListener('click', () => {
  if (currentWeek < Object.entries(scheduleData).length - 1) {
    currentWeek++;
    generateTable();
  }
});