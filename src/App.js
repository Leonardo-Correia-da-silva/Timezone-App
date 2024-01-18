
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import './App.css';



const App = () => {
  const { t } = useTranslation();

  const [timezones, setTimezones] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.timezonedb.com/v2.1/list-time-zone?key=6LMMMZLM95D4&format=json`
        );

        const uniqueCountries = Array.from(new Set(response.data.zones.map(zone => zone.countryCode)));

        setCountries(uniqueCountries);
        setTimezones(response.data.zones);
      } catch (error) {
        console.error('Erro ao obter dados de fusos horários:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCountryCodeChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };

  const handleShowTimezone = () => {
    const selectedZone = timezones.find(
      (timezone) => timezone.countryCode.toLowerCase() === selectedCountryCode.toLowerCase()
    );

    setSelectedTimezone(selectedZone);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getCountryName = (countryCode) => {
    const country = timezones.find((timezone) => timezone.countryCode === countryCode);
    return country ? country.countryName : '';
  };

  const handleSelectorToggle = () => {
    setIsSelectorOpen(!isSelectorOpen);
  };

  return (
    <div className="container">
      <h1>{t('title')}</h1>
      <div>
        <label htmlFor="countryCode">{t('selectCountryLabel')}</label>
        <select
          id="countryCode"
          value={selectedCountryCode}
          onChange={handleCountryCodeChange}
          onClick={handleSelectorToggle}
          onBlur={handleSelectorToggle}
        >
          <option value="">{t('chooseCountryOption')}</option>
          {countries.map((countryCode) => (
            <option key={countryCode} value={countryCode}>
              {getCountryName(countryCode)}
            </option>
          ))}
        </select>
        <button onClick={handleShowTimezone} disabled={!selectedCountryCode}>
          {t('showTimeButton')}
        </button>
      </div>
      {selectedTimezone && (
        <p>
          {t('months.' + (currentTime.getMonth() + 1))}  {currentTime.getDate()} - {currentTime.getFullYear()}{' | '}
          {currentTime.toLocaleTimeString('en-US', {
            timeZone: selectedTimezone.zoneName,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </p>
      )}
      <div className='on-click'>
        <button onClick={() => changeLanguage('pt-BR')}>{t('portuguese')}</button>
        <button onClick={() => changeLanguage('en')}>{t('english')}</button>
      </div>
    </div>
  );
};

export default App;

















