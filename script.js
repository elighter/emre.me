document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const themeToggle = document.getElementById('themeToggle');
    
    // Dil ayarları
    const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    setLanguage(browserLang);
    languageToggle.checked = browserLang === 'tr';

    // Tema ayarları
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    themeToggle.checked = savedTheme === 'light';

    // Dil değiştirme olayını dinle
    languageToggle.addEventListener('change', function() {
        const newLang = this.checked ? 'tr' : 'en';
        setLanguage(newLang);
    });

    // Tema değiştirme olayını dinle
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'light' : 'dark';
        setTheme(newTheme);
    });
});

function setLanguage(lang) {
    // Bio metnini güncelle (eğer sayfa içinde varsa)
    const bioElement = document.querySelector('.bio');
    if (bioElement) {
        bioElement.textContent = bioElement.getAttribute(`data-${lang}`);
    }

    // Buton metinlerini güncelle
    document.querySelectorAll('[data-en][data-tr]').forEach(element => {
        const content = element.getAttribute(`data-${lang}`);
        
        // E-posta paragrafı için özel işlem
        if (content.includes('emrecakmak@me.com')) {
            const emailLink = `<a href='mailto:emrecakmak@me.com' class='email-link'>emrecakmak@me.com</a>`;
            if (lang === 'tr') {
                element.innerHTML = `Bağlantı kurmak veya organizasyonunuza nasıl değer katabileceğimi keşfetmek isterseniz, ${emailLink} adresinden benimle iletişime geçmekten çekinmeyin.`;
            } else {
                element.innerHTML = `If you'd like to connect or explore how I can add value to your organization, feel free to reach out to me at ${emailLink}.`;
            }
        } else {
            element.textContent = content;
        }
    });

    // HTML lang attribute'unu güncelle
    document.documentElement.lang = lang;

    // Sayfa başlığını güncelle
    const pageName = document.title.includes('About Me') ? (lang === 'tr' ? 'Hakkımda' : 'About Me') : '';
    document.title = `${lang === 'tr' ? 'Emre Çakmak' : 'Emre Cakmak'}${pageName ? ' - ' + pageName : ''}`;
}

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
} 