import { useTranslation } from "react-i18next";
import EventCalendar from "../../../components/eventCalendar/eventCalendar";
import { useState } from "react";
import Popup from "../../../components/popup/popup";
import './events.css';
import Button from "../../../components/button/button";

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
        </div>
    )
}