import './home.css';
import Popup from '../../components/popup/popup';
import RightColumn from '../../components/rightColumn/rightColumn';
import MyFrenchFilmFestival from '../../assets/images/my-french-film-festival.jpg';
import CesarAwards from '../../assets/images/cesar-awards.jpg';
import AnnecyInternational from '../../assets/images/annecy-international.jpg';
import FrenchFilmFestivalYokohama from '../../assets/images/french-film-festival-yokohama.jpg';
import CannesFilmFestival from '../../assets/images/cannes-film-festival.jpg';
import DinardFilmFestival from '../../assets/images/dinard-film-festival.jpg';
import Cinemania from '../../assets/images/cinemania.jpg';
import HanabiSeasons from '../../assets/images/hanabi-seasons.jpg';
import FrenchFilmFestivalUK from '../../assets/images/french-film-festival-uk.jpg';
import MonteCarloSpringArts from "../../assets/images/monte-carlo-spring-arts.jpg";
import BanlieuesBleues from '../../assets/images/banlieues-bleues.jpg';
import ParisJazz from '../../assets/images/paris-jazz.jpg';
import CognacBluesPassions from '../../assets/images/cognac-blues-passions.jpg';
import Beatles from '../../assets/images/beatles.jpg';
import JMusicFestival from '../../assets/images/j-music-festival.jpg';
import FrancophoneDayParty from '../../assets/images/francophone-day-party.jpg';
import FrenchConnections from '../../assets/images/french-connections.jpg';
import BonjourFrance from '../../assets/images/bonjour-france.jpg';
import FrancosDeMontreal from '../../assets/images/francos-de-montreal.jpg';
import FranceMapEN from '../../assets/images/france-map-en.jpg';
import FranceMapFR from '../../assets/images/france-map-fr.jpg';
import FranceMapJA from '../../assets/images/france-map-ja.jpg';
import { useTranslation } from 'react-i18next';
import { useState, useContext, useEffect } from "react";
import { CountryCodeContext } from "../../App";
import i18n from '../../i18n';
import SpotlightCarousel from '../../components/spotlightCarousel/spotlightCarousel';
import FlipCard from '../../components/flipCard/flipCard';

const filmImages = [MyFrenchFilmFestival, CesarAwards, FrenchFilmFestivalYokohama, CannesFilmFestival, AnnecyInternational, DinardFilmFestival, Cinemania, HanabiSeasons, FrenchFilmFestivalUK];
const musicImages =  [JMusicFestival, MonteCarloSpringArts, BanlieuesBleues, BonjourFrance, Beatles, FrenchConnections, FrancosDeMontreal, ParisJazz, FrancophoneDayParty, CognacBluesPassions];

export default function Home() {
    const ns = "common";
    const { t } = useTranslation([ns, 'music']);
    
    const date = new Date();
    const frenchDate = date.toLocaleDateString("sv", {timeZone: "Europe/Paris"});

    const filmEvents = t('list-events', { ns: "film", returnObjects: true });
    const musicEvents = t('list-events', { ns: "music", returnObjects: true });

    const countryCode = useContext(CountryCodeContext);
    
    const [popupData, setPopupData] = useState({type: "", title: "", content: null, ns: ns, visible: false});
    
    const showPopup = (type, title, content) => {
        setPopupData({type, title, content, ns: ns, visible: true});
    }

    const hidePopup = () => {
        setPopupData({...popupData, visible: false});
    }

    const [pageVisited, setPageVisited] = useState("");

    const welcomeGB = "<div class='welcome-row'><div class='welcome-item'><p><b>Welcome!</b></p><span class='flag-icon flag-icon-gb welcome'></span></div><p class='arrows'>&#8644;</p><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-fr welcome'></span></div></div><p>Notice the space before the exclamation mark? That's how some punctuation is written in French. You put a space before using these punctuation marks:<br /><ul><li>semi-colon (;)</li><li>exclamation mark (!)</li><li>question mark (?)</li><li>colon (:)</li><li>quotation marks (« and » in French)</li><li>percentage sign (%)</li><li>currency symbols (eg. €)</li></ul></p>";
    const welcomeCA = "<div class='welcome-row'><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-ca welcome'></span></div><p class='arrows'>&#8644;</p><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-fr welcome'></span></div></div>";
    const welcomeJP = "<div class='welcome-row'><div class='welcome-item'><p><b>ようこそ！</b></p><span class='flag-icon flag-icon-jp welcome'></span></div><p class='arrows'>&#8644;</p><div class='welcome-item'><p><b>Bienvenue !</b></p><span class='flag-icon flag-icon-fr welcome'></span></div></div><p>感嘆符の前にスペースがあることにお気づきだろうか？これはフランス語の句読点の書き方です。<li>セミコロン(;)</li><li>感嘆符(!)</li><li>クエスチョンマーク(?)</li><li>コロン(:)</li><li>引用符(フランス語では<<と>>)</li><li>パーセント記号(%)</li><li>通貨記号(例：€)</li></ul></p>";
    
    useEffect(() => {
        const welcomeContent = () => {
            switch (countryCode) {
                case 'jp':
                    return welcomeJP;
                case 'ca':
                    return welcomeCA;
                default:
                    return welcomeGB;
            }
        };

        const visited = localStorage.getItem("visited");
        setPageVisited(visited);
        if (!visited || visited === "false") {
            showPopup("connection", '', welcomeContent());
            localStorage.setItem("visited", "true");
        }
    }, [countryCode]);

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

    const [parisWeatherResponse, setParisWeatherResponse] = useState([]);
        
    useEffect(() => {
        fetch("/api/fetchWeather")
        .then(response => response.json())
        .then(data => setParisWeatherResponse(data))
        .catch(error => console.log("There was an error fetching weather!"));
    }, []);

    const [userWeatherResponse, setUserWeatherResponse] = useState([]);
        
    useEffect(() => {
        fetch("/api/fetchWeather?q=" + getFetchCapital(countryCode))
        .then(response => response.json())
        .then(data => setUserWeatherResponse(data))
        .catch(error => console.log("There was an error fetching weather!"));
    }, [countryCode]);

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
                        
                        <h5 className="category-heading"><b>{t('home-heading-1')}</b></h5>
                        <p>{t('home-description-1')}</p>
                        <h6 className="category-heading"><b>{t('home-heading-2')}</b></h6>
                        <p>{t('home-description-2')}</p>
                    </div>
                </div>
            </div>
            <RightColumn>
                <FlipCard />

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

                {filmEvents.filter(event => {
                    if (event.start <= frenchDate && event.end > frenchDate) return true;

                    return false;
                })
                .map(event => (
                    <div key={event.id} className="right-column-event-frame">
                        <img className="right-column-event-icon" src={filmImages[event.id - 1]} alt={event.text} />
                        <h6 className="right-column-event-title"><b>{event.text}</b></h6>
                        <p><i>{event.longDate}</i></p>
                    </div>
                ))}

                {musicEvents.filter(event => {
                    if (event.start <= frenchDate && event.end > frenchDate) return true;

                    return false;
                })
                .map(event => (
                    <div key={event.id} className="right-column-event-frame">
                        <img className="right-column-event-icon" src={musicImages[event.id - 1]} alt={event.text} />
                        <h6 className="right-column-event-title"><b>{event.text}</b></h6>
                        <p><i>{event.longDate}</i></p>
                    </div>
                ))}
            </RightColumn>
        </div>
    )
}