import i18n from 'i18next';
import zh_CN from "@/locales/zh_CN.json";
import en from "@/locales/en.json";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh_CN },
        },
        fallbackLng: 'en',
        preload: ['en', 'zh'],
        interpolation: {
            escapeValue: false,
        },
    });
export default i18n