document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.purchase-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Сбор данных из формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const errors = validateForm(data);
        if (errors.length > 0) {
            alert(`Ошибка: ${errors.join(', ')}`);
            return;
        }

        // Отправка данных
        fetch('http://localhost:3000/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('Успешная отправка:', result);
                form.reset();
                alert(result.data.response || 'Ваша заявка успешно отправлена!');
            })
            .catch(error => {
                console.error('Ошибка при отправке:', error);
                alert('Не удалось отправить данные. Пожалуйста, попробуйте снова.');
            });
    });
});

// функция проверки формы
function validateForm(data){
    const errors = [];

    if (!data.name || data.name.trim().length < 3) {
        errors.push('Имя должно содержать не менее 3 символов');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Некорректный адрес электронной почты');
    }

    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.push('Телефон должен быть в формате +7 (XXX) XXX-XX-XX');
    }

    if (!data.solution) {
        errors.push('Необходимо выбрать решение');
    }

    return errors;
}
