import './home.css';
import Popup from '../../components/popup/popup';
import RightColumn from '../../components/rightColumn/rightColumn';
import SpotlightCarousel from '../../components/spotlightCarousel/spotlightCarousel';
import FlipCard from '../../components/flipCard/flipCard';

import MyFrenchFilmFestival from '../../assets/images/my-french-film-festival.jpg';
import JMusicFestival from '../../assets/images/j-music-festival.jpg';
import CesarAwards from '../../assets/images/cesar-awards.jpg';
import MonteCarloSpringArts from "../../assets/images/monte-carlo-spring-arts.jpg";
import BanlieuesBleues from '../../assets/images/banlieues-bleues.jpg';
import FrenchFilmFestivalYokohama from '../../assets/images/french-film-festival-yokohama.jpg';
import BonjourFrance from '../../assets/images/bonjour-france.jpg';
import Beatles from '../../assets/images/beatles.jpg';
import CannesFilmFestival from '../../assets/images/cannes-film-festival.jpg';
import FrenchConnections from '../../assets/images/french-connections.jpg';
import AnnecyInternational from '../../assets/images/annecy-international.jpg';
import FrancosDeMontreal from '../../assets/images/francos-de-montreal.jpg';
import ParisJazz from '../../assets/images/paris-jazz.jpg';
import FrancophoneDayParty from '../../assets/images/francophone-day-party.jpg';
import CognacBluesPassions from '../../assets/images/cognac-blues-passions.jpg';
import DinardFilmFestival from '../../assets/images/dinard-film-festival.jpg';
import Cinemania from '../../assets/images/cinemania.jpg';
import HanabiSeasons from '../../assets/images/hanabi-seasons.jpg';
import FrenchFilmFestivalUK from '../../assets/images/french-film-festival-uk.jpg';

import Welcome from '../../assets/images/welcome.png';
import FranceMapEN from '../../assets/images/france-map-en.jpg';
import FranceMapFR from '../../assets/images/france-map-fr.jpg';
import FranceMapJA from '../../assets/images/france-map-ja.jpg';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from "react";
import { CountryCodeContext } from "../../App";

const images = [MyFrenchFilmFestival, JMusicFestival, CesarAwards, MonteCarloSpringArts, BanlieuesBleues, FrenchFilmFestivalYokohama, BonjourFrance, Beatles, CannesFilmFestival, FrenchConnections, AnnecyInternational, FrancosDeMontreal, ParisJazz, FrancophoneDayParty, CognacBluesPassions, DinardFilmFestival, Cinemania, HanabiSeasons, FrenchFilmFestivalUK];

export default function Home() {
    const ns = "common";
    const { t, i18n } = useTranslation([ns, 'music']);

    useEffect(() => {
        document.title = t('title');
    });
    
    const date = new Date();
    //get date in YYYY-MM-DD format
    const frenchDate = date.toLocaleDateString("sv", {timeZone: "Europe/Paris"});

    const events = t('list-events', { ns: 'events', returnObjects: true });

    const countryCode = useContext(CountryCodeContext);
    
    const [popupData, setPopupData] = useState({type: "", title: "", content: null, ns: ns, visible: false});
    
    const showPopup = (type, title, content) => {
        setPopupData({type, title, content, ns: ns, visible: true});
    }

    const hidePopup = () => {
        setPopupData({...popupData, visible: false});
    }

    const [pageVisited, setPageVisited] = useState("");

    const welcomeGB = `<div class='welcome-row'><div class='welcome-item'><p><b>Welcome!</b></p><span class='flag-icon flag-icon-gb welcome'></span></div><p class='arrows'>&#8644;</p><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-fr welcome'></span></div></div><img src=${Welcome} alt='Welcome' width='100%' />`;
    const welcomeCA = `<div class='welcome-row'><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-ca welcome'></span></div><p class='arrows'>&#8644;</p><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-fr welcome'></span></div></div><img src=${Welcome} alt='Welcome' width='100%' />`;
    const welcomeJP = `<div class='welcome-row'><div class='welcome-item'><p><b>ようこそ！</b></p><span class='flag-icon flag-icon-jp welcome'></span></div><p class='arrows'>&#8644;</p><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-fr welcome'></span></div></div><img src=${Welcome} alt='Welcome' width='100%' />`;
    
    useEffect(() => {
        const welcomeContent = () => {
            switch (i18n.resolvedLanguage) {
                case 'ja':
                    return welcomeJP;
                case 'fr':
                    return welcomeCA;
                default:
                    return welcomeGB;
            }
        };

        //show welcome popup if new user
        const visited = localStorage.getItem("visited");
        setPageVisited(visited);
        if (!visited || visited === "false") {
            showPopup("connection", '', welcomeContent());
            localStorage.setItem("visited", "true");
        }
    }, [i18n.resolvedLanguage, welcomeCA, welcomeGB, welcomeJP]);

    const getFetchCapital = (code) => {
        switch (code) {
            case "jp":
                return "Tokyo";
            case "ca":
                return "Quebec City";
            default:
                return "London";
        }
    }

    const [userWeatherResponse, setUserWeatherResponse] = useState([]);
        
    useEffect(() => {
        //pass location to API handler
        fetch("/api/fetchWeather?q=" + getFetchCapital(countryCode))
        .then(response => response.json())
        .then(data => setUserWeatherResponse(data))
        .catch(error => console.log("There was an error fetching weather!"));
    }, [countryCode]);

    const [parisWeatherResponse, setParisWeatherResponse] = useState([]);
        
    useEffect(() => {
        fetch("/api/fetchWeather")
        .then(response => response.json())
        .then(data => setParisWeatherResponse(data))
        .catch(error => console.log("There was an error fetching weather!"));
    }, []);

    const getCapital = (code) => {
        switch (code) {
            case "jp":
                return "tokyo";
            case "ca":
                return "quebec-city";
            default:
                return "london";
        }
    }

    const getFlag = () => {
        switch (countryCode) {
            case "jp":
                return "flag-icon-jp";
            case "ca":
                return "flag-icon-ca";
            default:
                return "flag-icon-gb";
        }
    }

    const getCurrency = (code) => {
        switch (code) {
            case "jp":
                return "JPY";
            case "ca":
                return "CAD";
            default:
                return "GBP";
        }
    }

    const [currencyConversion, setCurrencyConversion] = useState([]);
        
    useEffect(() => {
        //pass country code to API handler
        fetch("/api/fetchCurrency?currency=" + getCurrency(countryCode))
        .then(response => response.json())
        .then(data => setCurrencyConversion(data))
        .catch(error => console.log("There was an error fetching conversion rates!"));
    }, [countryCode]);

    const getSymbol = (code) => {
        switch (code) {
            case "jp":
                return "¥";
            case "ca":
                return "$";
            default:
                return "£";
        }
    }

    //make sure day number comes in front of month
    const lang = i18n.resolvedLanguage === "en" ? "en-gb" : i18n.language;
    const options = {
        timeZone: "Europe/Paris",
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat(lang, options).format(date);

    //get date in format DD/MM
    const shortOptions = {
        timeZone: "Europe/Paris",
        month: 'numeric',
        day: 'numeric'
    };
    const shortDate = new Intl.DateTimeFormat("en-gb", shortOptions).format(date);

    const onThisDayEvents = t('on-this-day-events', { returnObjects: true });
    //load event where event date is the current date
    const onThisDayEvent = onThisDayEvents.find(event => event.date === shortDate);

    return (
        <div className="content"> 
            <title>Home | L'Hexagone</title>
            <div className="left">
                <div className="no-category-container">
                    <div className={"overlay" + (popupData.visible ? " visible" : "")}></div>
                    <div className={"popup-container" + (popupData.visible ? " visible": "")}>
                        <Popup {...popupData} hidePopup={hidePopup} tourLocations={[]} setTourLocations={""} />
                    </div>
                    <SpotlightCarousel />

                    <div className="home-intro">
                        {i18n.resolvedLanguage === "en" && (<img className="region-map" src={FranceMapEN} alt="French Regions" />)}
                        {i18n.resolvedLanguage === "fr" && (<img className="region-map" src={FranceMapFR} alt="French Regions" />)}
                        {i18n.resolvedLanguage === "ja" && (<img className="region-map" src={FranceMapJA} alt="French Regions" />)}
                        
                        <h5 className="category-heading top"><b>{t('home-heading-1')}</b></h5>
                        <p>{t('home-description-1')}</p>
                        <h6 className="category-heading"><b>{t('home-heading-2')}</b></h6>
                        <p>{t('home-description-2')}</p>
                    </div>
                </div>
            </div>
            <RightColumn>
                <div>
                    <div className="text-row">
                        <h5><b>{t('on-this-day')}</b></h5>
                        <h5><b>{formattedDate}</b></h5>
                    </div>
                    <FlipCard type="on-this-day" front={t('reveal')} back={onThisDayEvent?.text} />
                </div>

                {/* weather comparison */}
                <div className="comparison">
                    <div className="comparison-container">
                        <h5><b>{t(getCapital(countryCode))}</b></h5>
                        <img className="weather-icon" src={"https://cdn.weatherapi.com/weather/128x128/" + userWeatherResponse?.current?.condition?.icon.substring(35) ?? ""} alt="Weather Icon" />
                        <p className="comparison-text">{userWeatherResponse?.current?.temp_c ?? "Loading"}°C</p>  
                        <span className={"flag-icon comparison " + getFlag()}></span>                  
                    </div>

                    <div className="comparison-container">
                        <h5><b>{t('paris')}</b></h5>
                        <img className="weather-icon" src={"https://cdn.weatherapi.com/weather/128x128/" + parisWeatherResponse?.current?.condition?.icon.substring(35) ?? ""} alt="Weather Icon" />
                        <p className="comparison-text">{parisWeatherResponse?.current?.temp_c ?? "Loading"}°C</p>    
                        <span className="flag-icon comparison flag-icon-fr"></span>                
                    </div>
                </div>

                {/* currency comparison */}
                <div className="comparison">
                    <div className="comparison-container">
                        <h5><b>{t(getCurrency(countryCode))}</b></h5>
                        <p className="comparison-text">{getSymbol(countryCode)}1.00</p>  
                        <span className={"flag-icon comparison " + getFlag()}></span>                  
                    </div>

                    <div className="comparison-container">
                        <h5><b>{t('EUR')}</b></h5>
                        <p className="comparison-text">€{currencyConversion?.conversion_rate ?? "Loading"}</p>    
                        <span className="flag-icon comparison flag-icon-fr"></span>                
                    </div>
                </div>

                {events.filter(event => {
                    if (event.start <= frenchDate && event.end > frenchDate && (event.country.includes("France") || (event.connection === countryCode && event.country !== "France"))) return true;

                    return false;
                })
                .map(event => (
                    <div key={event.id} className="right-column-event-frame">
                        <img className="right-column-event-icon" src={images[event.id - 1]} alt={event.text} />
                        <h6 className="right-column-event-title"><b>{event.text}</b></h6>
                        <p><i>{event.longDate}</i></p>
                    </div>
                ))}
            </RightColumn>
        </div>
    )
}