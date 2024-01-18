// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          title: 'Current Times Around the World',
          selectCountryLabel: 'Select Country:',
          chooseCountryOption: 'Choose a country',
          showTimeButton: 'Show Time',
          portuguese: 'Portuguese',
          english: 'English',
          months: {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
          },
        }
      },
      'pt-BR': {
        translation: {
          title: 'Horários Atuais ao Redor do Mundo',
          selectCountryLabel: 'Selecione o País:',
          chooseCountryOption: 'Escolha um país',
          showTimeButton: 'Mostrar Horário',
          portuguese: 'Português',
          english: 'English',
          months: {
            1: 'Janeiro',
            2: 'Fevereiro',
            3: 'Março',
            4: 'Abril',
            5: 'Maio',
            6: 'Junho',
            7: 'Julho',
            8: 'Agosto',
            9: 'Setembro',
            10: 'Outubro',
            11: 'Novembro',
            12: 'Dezembro',
          },
        }
      }
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();


