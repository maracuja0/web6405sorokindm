// Функция для получения данных с "бэка"
async function fetchTeamData(){
    // используем .then для обработки данных
    fetch('http://localhost:3000/team')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            updateTable(data.data);
        })
        // отлавливаем ошибки и кидаем алерт в случае неудачи
        .catch(error => {
            console.error('Ошибка при запросе данных:', error);
            alert('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
        });
}

// Функция для обновления данных в таблице
async function updateTable(data){
    const tbody = document.querySelector("#team-table tbody") // получаем доступ к таблице

    console.log(tbody)
    tbody.innerHTML = ''; // чистим, а то мало ли там

    data.forEach(el => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${el.name}</td>
            <td>${el.position}</td>
            <td>${el.description}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', fetchTeamData);