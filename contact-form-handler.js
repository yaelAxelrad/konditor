document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessages = document.getElementById('formMessages');
    const submitButton = document.getElementById('submitButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // מונע מהדף להיטען מחדש

        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';

        // איסוף הנתונים מהטופס
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            eventType: form.eventType.value,
            message: form.message.value
        };

        // שליחת הנתונים לשרת באמצעות Fetch API
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            formMessages.className = 'form-messages'; // איפוס העיצוב
            if (data.success) {
                formMessages.classList.add('success');
                formMessages.textContent = 'הפנייה נשלחה בהצלחה! ניצור קשר בהקדם.';
                form.reset(); // ניקוי הטופס
            } else {
                throw new Error(data.message || 'אירעה שגיאה בשליחת הטופס.');
            }
        })
        .catch(error => {
            formMessages.className = 'form-messages'; // איפוס העיצוב
            formMessages.classList.add('error');
            formMessages.textContent = error.message;
        })
        .finally(() => {
            // החזרת הכפתור למצב המקורי
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
});