import './locations.css';
import Button from '../../../components/button/button';
import Popup from '../../../components/popup/popup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Locations() {
    const ns = "film";
    const { t } = useTranslation(ns);

    const [filterSelected, setFilterSelected] = useState("All");
    
    const changeFilter = (filter) => {
        setFilterSelected(filter);
    }

    const filmingLocations = t('filming-locations', { returnObjects: true });

    const [tourLocations, setTourLocations] = useState([]);
    
    useEffect(() => {
        const addedLocations = JSON.parse(localStorage.getItem("tourLocations")) || [];
        setTourLocations(addedLocations);
    }, []);

    const handleLocationClick = (locationID) => {
        let tempLocations;
        if (tourLocations.includes(locationID)) {
            tempLocations = tourLocations.filter(item => item !== locationID);
        }
        else {
            tempLocations = [...tourLocations, locationID];
        }

        setTourLocations(tempLocations);
        localStorage.setItem("tourLocations", JSON.stringify(tempLocations));
    }

    const [popupData, setPopupData] = useState({type: "", title: "", content: null, ns: ns, visible: false});
    
    const showPopup = (type, title, content) => {
        setPopupData({type, title, content, ns: ns, visible: true});
    }

    const hidePopup = () => {
        setPopupData({...popupData, visible: false});
    }

    return (
        <div className="category-component">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0..1,0" />
            <div className={"overlay" + (popupData.visible ? " visible" : "")}></div>
            <div className={"popup-container" + (popupData.visible ? " visible": "")}>
                <Popup {...popupData} hidePopup={hidePopup} tourLocations={tourLocations} setTourLocations={setTourLocations} />
            </div>

            <div className="btn-view-tour-container">
                <Button type="default" text={t('view-tour')} onClick={() => showPopup("default", 'plan-your-tour', "tourLocations")} />
            </div>
            <br />

            <p>{t('locations-description')}</p>

            <div className="events-filter">
                <Button type={filterSelected === "All" ? "filter selected" : "filter"} text={t('all', { ns: 'common' })} onClick={() => changeFilter("All")} />
                <Button type={filterSelected === "Paris" ? "filter selected" : "filter"} text={t('paris')} onClick={() => changeFilter("Paris")} />
                <Button type={filterSelected === "Riviera" ? "filter selected" : "filter"} text={t('riviera')} onClick={() => changeFilter("Riviera")} />
                <Button type={filterSelected === "Countryside" ? "filter selected" : "filter"} text={t('countryside')} onClick={() => changeFilter("Countryside")} />
                <Button type={filterSelected === "Normandy & Brittany" ? "filter selected" : "filter"} text={t('normandy-brittany')} onClick={() => changeFilter("Normandy & Brittany")} />
                <Button type={filterSelected === "Other Cities" ? "filter selected" : "filter"} text={t('other-cities')} onClick={() => changeFilter("Other Cities")} />
            </div>

            {filmingLocations.filter(filmingLocation => {
                if (filterSelected === "All") return true;
                if (filterSelected === "Paris" && filmingLocation.location === "Paris") return true;
                if (filterSelected === "Riviera" && filmingLocation.location === "Riviera") return true;
                if (filterSelected === "Countryside" && filmingLocation.location === "Countryside") return true;
                if (filterSelected === "Normandy & Brittany" && filmingLocation.location === "Normandy & Brittany") return true;
                if (filterSelected === "Other Cities" && filmingLocation.location === "Other Cities") return true;
                return false;
            })
            .map(filmingLocation => (
                <div key={filmingLocation.id} className="filming-location-container">
                    <h5><b>{filmingLocation.name}</b></h5>
                    <div className="filming-location-details">
                        <div className="description-image-container right location">
                            <img className="description-image location" src={filmingLocation.image} alt={filmingLocation.name} />
                            <iframe title={filmingLocation.name} src={filmingLocation.streetview} width={400} height={300} allow="accelerometer; fullscreen; geolocation; gyroscope" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                        <div className="filming-location-description" dangerouslySetInnerHTML={{__html: filmingLocation.description}} /><br />
                        <p><b>{t('filming-locations-heading')}</b></p>
                        {filmingLocation.locations.map(location => (
                            <div key={location.link} className="location-links">
                                <button type="button" className="btn-add-tour" onClick={() => handleLocationClick(location.id)}>
                                    <span key={location.id + "-" + tourLocations.includes(location.id)} className={"material-symbols-outlined " + tourLocations.includes(location.id) + " animate"}>{tourLocations.includes(location.id) ? "check_circle" : "add_circle"}</span>
                                </button>
                                <i><a href={location.link} target='_blank' rel='noreferrer'>{location.linkText}</a></i>
                            </div>
                        ))}
                    </div>
                </div>
            ))}   
        </div>
    )
}