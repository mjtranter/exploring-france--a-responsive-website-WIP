import './popup.css';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import EventCalendar from '../eventCalendar/eventCalendar';
import Tour from '../tour/tour';
import Button from '../button/button';

export default function Popup({type, title, content, ns, visible, hidePopup, tourLocations, setTourLocations}) {
    const { t } = useTranslation([ns, 'common']);

    const [iframeURL, setIframeURL] = useState("");

    const filmingLocations = t('filming-locations', { returnObjects: true });

    const [shareURL, setShareURL] = useState("");
    const [shareVisible, setShareVisible] = useState(false);

    useEffect(() => {
        //get location details of locations in tour
        const tempTourLocations = tourLocations.map(tourLocation => {
            for (const filmingLocation of filmingLocations) {
                const location = filmingLocation.locations.find(item => item.id === tourLocation);
                if (location) return location;
            }

            return null;
        });

        if (tempTourLocations.length === 0) { setIframeURL(""); setShareVisible(false) };
        if (tempTourLocations.length === 1) { setIframeURL("https://www.google.com/maps/embed/v1/place?key=AIzaSyD54RmAGLKl8pEeB27PkxmtsZS6wTXewqY&q=" + tempTourLocations[0].directionLink); setShareVisible(false) };
        if (tempTourLocations.length >= 2) {
            //set start and end points of route
            let embedURL = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyD54RmAGLKl8pEeB27PkxmtsZS6wTXewqY&origin=" + tempTourLocations[0].directionLink + "&destination=" + tempTourLocations[tempTourLocations.length - 1].directionLink;
            if (tempTourLocations.length > 2) {
                embedURL += "&waypoints=";
                //for each waypoint add link to URL
                tempTourLocations.slice(1, tempTourLocations.length - 1).map(tempTourLocation => (
                    embedURL += tempTourLocation.directionLink + "|"
                ));

                //remove final pipe
                embedURL = embedURL.slice(0, -1);
            }

            //set mode to walking if all locations are within one city
            const sameCity = tempTourLocations.every(tempTourLocation => tempTourLocation.city === tempTourLocations[0].city);
            const mode = sameCity ? "walking" : "driving";

            embedURL += "&mode=" + mode;
            setIframeURL(embedURL);

            //adapt embedURL to normal route link
            let tempURL = "https://www.google.com/maps/dir/?api=1" + embedURL.slice(91, embedURL.length);
            tempURL = tempURL.split("&mode=");
            tempURL = tempURL[0] + "&travelmode=" + tempURL[1];
            setShareURL(tempURL);
            setShareVisible(true);
        }
    }, [tourLocations, filmingLocations]);

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
            <iframe title="map" className="map-embed" src={iframeURL} width="100%" height="350" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <Button type={"share " + shareVisible} text={t('share')} onClick={() => {
                if (navigator.share) {
                    navigator.share({
                        title: t('share-title'),
                        text: `${t('share-text')}\n\n${shareURL} `,
                        url: shareURL
                    })
                    .catch(() => console.log("There was an error sharing the tour."));
                }

                else {
                    window.open(shareURL, "_blank", "noreferrer");
                }
            }} />
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