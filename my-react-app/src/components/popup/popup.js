import { useTranslation } from 'react-i18next';
import EventCalendar from '../eventCalendar/eventCalendar';
import './popup.css';

export default function Popup({type, title, content, ns, visible, hidePopup}) {
    const { t } = useTranslation(ns);

    if (!visible) {
        document.body.style.overflow = "auto";
        return null;
    }

    document.body.style.overflow = "hidden";

    const modalHeader = "modal-header" + (type === "connection" ? " connection" : "");

    const popupContent = content === "calendar" ? <EventCalendar ns={ns} type="full" /> : <div dangerouslySetInnerHTML={{__html: t(content)}} />;

    return (          
        <div className="modal fade show" id="myModal" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden={!visible}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className={modalHeader} data-bs-theme="dark">
                        <h5 className="modal-title" id="myModalLabel">{t(title)}</h5>
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