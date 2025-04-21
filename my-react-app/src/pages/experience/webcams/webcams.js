import './webcams.css';
import PortDeLaSante from '../../../assets/images/port-de-la-sante.jpg';
import LaPlagneTarentaise from '../../../assets/images/la-plagne-tarentaise.jpg';
import Munster from '../../../assets/images/munster.jpg';
import LesSablesDolonne from '../../../assets/images/les-sables-dolonne.jpg';
import SaintMalo from '../../../assets/images/saint-malo.jpg';
import FontRomeu from '../../../assets/images/font-romeu.jpg';
import { useTranslation } from 'react-i18next';

const images = [PortDeLaSante, LaPlagneTarentaise, Munster, LesSablesDolonne, SaintMalo, FontRomeu];

export default function Webcams() {
    const ns = "experience";
    const { t } = useTranslation(ns);

    const webcams = t('list-webcams', { returnObjects: true });

    return (
        <div className="webcams-layout">
            {webcams.map(webcam => (
                <div key={webcam.id} className="webcam-container">
                    <h5 className="webcam-title"><b>{webcam.title}</b></h5>
                    <div className="webcam-description-map">
                        <p className="webcam-description">{webcam.description}</p>
                        <img className="webcam-map" src={images[webcam.id - 1]} alt={webcam.title} />
                    </div>
                    <iframe className="webcam" width="100%" height="268" src={"https://www.youtube.com/embed/" + webcam.embed} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            ))}
        </div>
    )
}