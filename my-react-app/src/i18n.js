import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr', 'ja'],
        ns: ['common', 'film', 'music', 'things-to-know', 'events', 'attractions', 'itineraries', 'experience'],
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        detection: {
            //set to browser language preference
            order: ['navigator']
        },
        //ignore any regions in detected language eg. 'en-gb' counts as 'en'
        load: 'languageOnly'
    });

export default i18n;