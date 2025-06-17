import '../../music/events/events.css';
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import { CountryCodeContext } from "../../../App";
import Popup from "../../../components/popup/popup";
import Button from "../../../components/button/button";
import EventCalendar from "../../../components/eventCalendar/eventCalendar";

import MyFrenchFilmFestival from '../../../assets/images/my-french-film-festival.jpg';
import JMusicFestival from '../../../assets/images/j-music-festival.jpg';
import CesarAwards from '../../../assets/images/cesar-awards.jpg';
import MonteCarloSpringArts from "../../../assets/images/monte-carlo-spring-arts.jpg";
import BanlieuesBleues from '../../../assets/images/banlieues-bleues.jpg';
import FrenchFilmFestivalYokohama from '../../../assets/images/french-film-festival-yokohama.jpg';
import BonjourFrance from '../../../assets/images/bonjour-france.jpg';
import Beatles from '../../../assets/images/beatles.jpg';
import CannesFilmFestival from '../../../assets/images/cannes-film-festival.jpg';
import FrenchConnections from '../../../assets/images/french-connections.jpg';
import AnnecyInternational from '../../../assets/images/annecy-international.jpg';
import FrancosDeMontreal from '../../../assets/images/francos-de-montreal.jpg';
import ParisJazz from '../../../assets/images/paris-jazz.jpg';
import FrancophoneDayParty from '../../../assets/images/francophone-day-party.jpg';
import CognacBluesPassions from '../../../assets/images/cognac-blues-passions.jpg';
import DinardFilmFestival from '../../../assets/images/dinard-film-festival.jpg';
import Cinemania from '../../../assets/images/cinemania.jpg';
import HanabiSeasons from '../../../assets/images/hanabi-seasons.jpg';
import FrenchFilmFestivalUK from '../../../assets/images/french-film-festival-uk.jpg';

const images = [MyFrenchFilmFestival, JMusicFestival, CesarAwards, MonteCarloSpringArts, BanlieuesBleues, FrenchFilmFestivalYokohama, BonjourFrance, Beatles, CannesFilmFestival, FrenchConnections, AnnecyInternational, FrancosDeMontreal, ParisJazz, FrancophoneDayParty, CognacBluesPassions, DinardFilmFestival, Cinemania, HanabiSeasons, FrenchFilmFestivalUK];

export default function Events() {
    const ns = "film";
    const { t } = useTranslation([ns, 'common']);

    useEffect(() => {
        document.title = t('events-title');
    });

    const countryCode = useContext(CountryCodeContext);

    const [popupData, setPopupData] = useState({type: "", title: "", content: null, ns: ns, visible: false});
    
    const showPopup = (type, title, content) => {
        setPopupData({type, title, content, ns: ns, visible: true});
    }

    const hidePopup = () => {
        setPopupData({...popupData, visible: false});
    }

    const events = t('list-events', { ns: 'events', returnObjects: true });

    const [filterSelected, setFilterSelected] = useState("All");

    const changeFilter = (filter) => {
        setFilterSelected(filter);
    }

    return (
        <div className="category-component">
            <div className={"overlay" + (popupData.visible ? " visible" : "")}></div>
            <div className={"popup-container" + (popupData.visible ? " visible": "")}>
                <Popup {...popupData} hidePopup={hidePopup} tourLocations={[]} setTourLocations={""} />
            </div>
            <div className="whats-on">
                <div className="whats-on-header-row">
                    <h5><b>{t('whats-on', { ns: 'common' })}</b></h5>
                    <Button type="default" text={t('view-full-calendar', { ns: 'common' })} onClick={() => showPopup("default", 'full-calendar', "calendar" )} />
                </div>

                <EventCalendar ns={ns} type="short" />
            </div>
            
            <div className="events-header-row">
                <h5 className="featured-events"><b>{t('featured-events', { ns: 'common' })}</b></h5>
                <div className="events-filter">
                    <Button type={filterSelected === "All" ? "filter selected" : "filter"} text={t('all', { ns: 'common' })} onClick={() => changeFilter("All")} />
                    <Button type={filterSelected === "Local" ? "filter selected" : "filter"} text={t('local', { ns: 'common' })} onClick={() => changeFilter("Local")} />
                    <Button type={filterSelected === "Free" ? "filter selected" : "filter"} text={t('free', { ns: 'common' })} onClick={() => changeFilter("Free")} />
                    {(countryCode === "gb" || countryCode === "ca" || countryCode === "jp") && (<Button type={filterSelected === "Connections" ? "filter-connection selected" : "filter-connection"} text={t('connections', { ns: 'common' })} onClick={() => changeFilter("Connections")} />)}
                    {(countryCode === "gb" || countryCode === "ca" || countryCode === "jp") && (<Button type={filterSelected === "Near You" ? "filter-near-you selected" : "filter-near-you"} text={t('near-you', { ns: 'common' })} onClick={() => changeFilter("Near You")} />)}
                </div>
            </div>
            


            {events.filter(event => {
                if (!event.type.includes("film")) return false;
                if (filterSelected === "All" && (event.country.includes("France") || (event.connection === countryCode && event.country !== "France"))) return true;
                if (filterSelected === "Local" && event.local === "True") return true;
                if (filterSelected === "Free" && event.free === "True") return true;
                if (filterSelected === "Connections" && event.connection === countryCode && event.country.includes("France")) return true;
                if (filterSelected === "Near You" && event.connection === countryCode && event.country !== "France") return true;
                return false;
            })
            .map(event => (
                <div key={event.id} className="event-frame">
                    <img className="event-icon" src={images[event.id - 1]} alt={event.text} />
                    <div className="event-content">
                        <div className="event-title">
                            <b>{event.text}</b>
                            {countryCode === "gb" && 'connectionGb' in event && (<Button type="connection" text={t('view-connection', { ns: "common" })} onClick={() => showPopup("connection", 'connection-gb', event.connectionGb)} />)}
                            {countryCode === "ca" && 'connectionCa' in event && (<Button type="connection" text={t('view-connection', { ns: "common" })} onClick={() => showPopup("connection", 'connection-ca', event.connectionCa)} />)}
                            {countryCode === "jp" && 'connectionJp' in event && (<Button type="connection" text={t('view-connection', { ns: "common" })} onClick={() => showPopup("connection", 'connection-jp', event.connectionJp)} />)}
                            <i className="event-date">{event.longDate}</i>
                        </div>

                        <div className="event-details">
                            <i>{t('location', { ns: 'common' })}: {event.location}</i>
                            <p className="event-description">{event.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}