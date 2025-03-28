document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    
    // Sayfa yüklendiğinde tarayıcı dilini kontrol et
    const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    setLanguage(browserLang);
    languageToggle.checked = browserLang === 'tr';

    // Dil değiştirme olayını dinle
    languageToggle.addEventListener('change', function() {
        const newLang = this.checked ? 'tr' : 'en';
        setLanguage(newLang);
    });
});

function setLanguage(lang) {
    // Bio metnini güncelle
    const bioElement = document.querySelector('.bio');
    bioElement.textContent = bioElement.getAttribute(`data-${lang}`);

    // Buton metinlerini güncelle
    document.querySelectorAll('[data-en][data-tr]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // HTML lang attribute'unu güncelle
    document.documentElement.lang = lang;
} 