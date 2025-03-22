import { useTranslation } from "react-i18next";
import EventCalendar from "../../../components/eventCalendar/eventCalendar";
import { useState } from "react";
import Popup from "../../../components/popup/popup";
import Button from "../../../components/button/button";
import MonteCarloSpringArts from "../../../assets/images/monte-carlo-spring-arts.jpg";
import ParisJazz from '../../../assets/images/paris-jazz.jpg';
import './events.css';

const images = [MonteCarloSpringArts, ParisJazz];

export default function Events() {
    const ns = "music";
    const { t } = useTranslation(ns);

    const [popupData, setPopupData] = useState({type: "", title: "", content: null, ns: ns, visible: false});
    
    const showPopup = (type, title, content) => {
        setPopupData({type, title, content, ns: ns, visible: true});
    }

    const hidePopup = () => {
        setPopupData({...popupData, visible: false});
    }

    const events = t('list-events', { returnObjects: true });

    return (
        <div className="category-component">
            <div className={"overlay" + (popupData.visible ? " visible" : "")}></div>
            <div className={"popup-container" + (popupData.visible ? " visible": "")}>
                <Popup {...popupData} hidePopup={hidePopup} />
            </div>
            <div className="whats-on">
                <div className="header-row">
                    <h5><b>{t('whats-on')}</b></h5>
                    <Button type="default" text={t('view-full-calendar')} onClick={() => showPopup("default", 'full-calendar', "calendar" )} />
                </div>

                <EventCalendar ns={ns} type="short" />
            </div>
            
            <h5 className="category-heading"><b>{t('featured-events')}</b></h5>


            {events.map(event => (
                <div key={event.id} className="event-frame">
                    <img className="event-icon" src={images[event.id - 1]} alt={event.text} />
                    <div className="event-content">
                        <div className="event-title">
                            <b>{event.text}</b>
                            <i>{event.longStart}{t('time-period')}{event.longEnd}</i>
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