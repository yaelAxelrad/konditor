// קוד זה הוא דמו בלבד. הוא ידמה התחברות ויאפשר אינטראקציה עם הממשק,
// אך אינו מחובר לשרת אמיתי.
document.addEventListener('DOMContentLoaded', function() {

    // --- לוגיקת התחברות (דמו) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('loginMessage');

            // במערכת אמיתית, כאן תישלח בקשה לשרת
            if (username === 'admin' && password === '1234') {
                // שמירת "טוקן" התחברות בדפדפן
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                loginMessage.textContent = 'שם משתמש או סיסמה שגויים.';
            }
        });
    }

    // --- הגנה על עמודים פנימיים ---
    // אם אנחנו לא בדף ההתחברות ובכל זאת לא מחוברים, העבר לדף ההתחברות
    if (!document.body.classList.contains('login-page')) {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'index.html';
        }
    }
    
    // --- לוגיקת התנתקות ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }

    // --- כאן יתווסף קוד שיטפל בהעלאת תמונות, שמירת טקסטים וכו' ---
    // לדוגמה, שליחת טופס 'אודות' לשרת:
    const aboutForm = document.getElementById('aboutForm');
    if(aboutForm) {
        aboutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const aboutText = document.getElementById('aboutText').value;
            alert(`המידע שישלח לשרת:\n${aboutText}`);
            // בקוד אמיתי:
            // fetch('/api/about', { method: 'POST', body: JSON.stringify({text: aboutText}), ... })
        });
    }
});