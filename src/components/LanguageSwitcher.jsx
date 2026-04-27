'use client';

import i18n from '../app/i18n';

export default function LanguageSwitcher() {

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);

        // RTL only for Urdu
        document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('ur')}>UR</button>
            <button onClick={() => changeLanguage('so')}>SO</button>
        </div>
    );
}