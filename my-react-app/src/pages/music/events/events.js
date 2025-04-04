import { useTranslation } from "react-i18next";
import EventCalendar from "../../../components/eventCalendar/eventCalendar";
import { useState, useContext } from "react";
import { CountryCodeContext } from "../../../App";
import Popup from "../../../components/popup/popup";
import Button from "../../../components/button/button";
import MonteCarloSpringArts from "../../../assets/images/monte-carlo-spring-arts.jpg";
import BanlieuesBleues from '../../../assets/images/banlieues-bleues.jpg';
import ParisJazz from '../../../assets/images/paris-jazz.jpg';
import CognacBluesPassions from '../../../assets/images/cognac-blues-passions.jpg';
import Beatles from '../../../assets/images/beatles.jpg';
import JMusicFestival from '../../../assets/images/j-music-festival.jpg';
import './events.css';

const images = [JMusicFestival, MonteCarloSpringArts, BanlieuesBleues, Beatles, ParisJazz, CognacBluesPassions];

export default function Events() {
    const ns = "music";
    const { t } = useTranslation(ns);

    const countryCode = useContext(CountryCodeContext);

    const [popupData, setPopupData] = useState({type: "", title: "", content: null, ns: ns, visible: false});
    
    const showPopup = (type, title, content) => {
        setPopupData({type, title, content, ns: ns, visible: true});
    }

    const hidePopup = () => {
        setPopupData({...popupData, visible: false});
    }

    const events = t('list-events', { returnObjects: true });

    const [filterSelected, setFilterSelected] = useState("All");

    const changeFilter = (filter) => {
        setFilterSelected(filter);
    }

    return (
        <div className="category-component">
            <div className={"overlay" + (popupData.visible ? " visible" : "")}></div>
            <div className={"popup-container" + (popupData.visible ? " visible": "")}>
                <Popup {...popupData} hidePopup={hidePopup} />
            </div>
            <div className="whats-on">
                <div className="whats-on-header-row">
                    <h5><b>{t('whats-on', { ns: 'common' })}</b></h5>
                    <Button type="default" text={t('view-full-calendar', { ns: 'common' })} onClick={() => showPopup("default", 'full-calendar', "calendar" )} />
                </div>

                <EventCalendar ns={ns} type="short" />
            </div>
            
            <div className="events-header-row">
                <h5 className="featured-events"><b>{t('featured-events')}</b></h5>
                <div className="events-filter">
                    <Button type={filterSelected === "All" ? "filter selected" : "filter"} text={t('all')} onClick={() => changeFilter("All")} />
                    <Button type={filterSelected === "Local" ? "filter selected" : "filter"} text={t('local')} onClick={() => changeFilter("Local")} />
                    <Button type={filterSelected === "Free" ? "filter selected" : "filter"} text={t('free')} onClick={() => changeFilter("Free")} />
                    {(countryCode === "gb" || countryCode === "ca" || countryCode === "jp") && (<Button type={filterSelected === "Connections" ? "filter-connection selected" : "filter-connection"} text={t('connections')} onClick={() => changeFilter("Connections")} />)}
                </div>
            </div>
            


            {events.filter(event => {
                if (filterSelected === "All") return true;
                if (filterSelected === "Local" && event.local === "True") return true;
                if (filterSelected === "Free" && event.free === "True") return true;
                if (filterSelected === "Connections" && event.connection === countryCode) return true;
                return false;
            })
            .map(event => (
                <div key={event.id} className="event-frame">
                    <img className="event-icon" src={images[event.id - 1]} alt={event.text} />
                    <div className="event-content">
                        <div className="event-title">
                            <b>{event.text}</b>
                            <i className="event-date">{event.longDate}</i>
                        </div>

                        <div className="event-details">
                            <i>{t('location')}: {event.location}</i>
                            <p className="event-description">{event.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}