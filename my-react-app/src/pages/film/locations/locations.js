import './locations.css';
import Button from '../../../components/button/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Locations() {
    const ns = "film";
    const { t } = useTranslation(ns);

    const [filterSelected, setFilterSelected] = useState("All");
    
    const changeFilter = (filter) => {
        setFilterSelected(filter);
    }

    const filmingLocations = t('filming-locations', { returnObjects: true });

    return (
        <div className="category-component">
            <p>{t('locations-description')}</p>

            <div className="events-filter">
                <Button type={filterSelected === "All" ? "filter selected" : "filter"} text={t('all')} onClick={() => changeFilter("All")} />
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
                            <iframe src={filmingLocation.streetview} width={400} height={300} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                        <div className="filming-location-description" dangerouslySetInnerHTML={{__html: filmingLocation.description}} /><br />
                        <p><b>{t('filming-locations-heading')}</b></p>
                        <div className="modal-body flag" dangerouslySetInnerHTML={{__html: filmingLocation.locations}} />
                    </div>
                    {/*<iframe src={filmingLocation.map} width="480" height="360"></iframe>*/}
                </div>
            ))}          
        </div>
    )
}