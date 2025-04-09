import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import EventCalendar from '../eventCalendar/eventCalendar';
import Tour from '../tour/tour';
import './popup.css';

export default function Popup({type, title, content, ns, visible, hidePopup, tourLocations, setTourLocations}) {
    const { t } = useTranslation([ns, 'common']);

    const [iframeURL, setIframeURL] = useState("");

    const filmingLocations = t('filming-locations', { returnObjects: true });

    useEffect(() => {
        const tempTourLocations = tourLocations.map(tourLocation => {
            for (const filmingLocation of filmingLocations) {
                const location = filmingLocation.locations.find(item => item.id === tourLocation);
                if (location) return location;
            }
        });

        if (tempTourLocations.length === 0) setIframeURL("");
        if (tempTourLocations.length === 1) setIframeURL("https://www.google.com/maps/embed/v1/place?key=AIzaSyD54RmAGLKl8pEeB27PkxmtsZS6wTXewqY&q=" + tempTourLocations[0].directionLink);
        if (tempTourLocations.length >= 2) {
            let embedURL = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyD54RmAGLKl8pEeB27PkxmtsZS6wTXewqY&origin=" + tempTourLocations[0].directionLink + "&destination=" + tempTourLocations[tempTourLocations.length - 1].directionLink;
            if (tempTourLocations.length > 2) {
                embedURL += "&waypoints=";
                tempTourLocations.slice(1, tempTourLocations.length - 1).map(tempTourLocation => (
                    embedURL += tempTourLocation.directionLink + "|"
                ));

                embedURL = embedURL.slice(0, -1);
            }

            const sameCity = tempTourLocations.every(tempTourLocation => tempTourLocation.city === tempTourLocations[0].city);
            const mode = sameCity ? "walking" : "driving";

            embedURL += "&mode=" + mode;
            console.log(embedURL);

            setIframeURL(embedURL);
        }
    }, [tourLocations]);

    if (!visible) {
        document.body.style.overflow = "auto";
        return null;
    }

    document.body.style.overflow = "hidden";

    const modalHeader = "modal-header" + (type === "connection" ? " connection" : "");

    let popupContent;

    if (content === "calendar") {
        popupContent = <EventCalendar ns={ns} type="full" />;
    }

    else if (content === "tourLocations") {
        popupContent = <>
            {tourLocations.length === 0 && (<p>{t('no-locations')}</p>)}
            {tourLocations.length === 1 && (<p>{t('one-location')}</p>)}
            {tourLocations.length >= 2 && (<p className="small-text">{t('two-locations')}</p>)}
            <Tour tourLocations={tourLocations} setTourLocations={setTourLocations} />
            <iframe title="map" className="map-embed" src={iframeURL} width="466.4" height="350" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </>;
    }

    else {
        popupContent = <div dangerouslySetInnerHTML={{__html: t(content)}} />;
    }

    return (          
        <div className="modal fade show" id="myModal" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden={!visible}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className={modalHeader} data-bs-theme="dark">
                        <h5 className="modal-title" id="myModalLabel">{t(title, { ns: 'common' })}</h5>
                        <button type="button" className="btn-close" onClick={hidePopup} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {popupContent}
                    </div>
                </div>
            </div>
        </div>
    )
}