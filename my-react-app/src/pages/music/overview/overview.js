import './overview.css';
import ChristineAndTheQueens from '../../../assets/images/christine-and-the-queens.jpg';
import FeteDeLaMusique from '../../../assets/images/fete-de-la-musique.jpg';
import { useTranslation } from 'react-i18next';

export default function Overview() {
    const ns = "music";
    const { t } = useTranslation(ns);

    return (
        <div className="category-component">
            <div className="description-image-container right">
                <img className="description-image" src={ChristineAndTheQueens} alt="Christine and the Queens" />
                <div dangerouslySetInnerHTML={{__html: t('christine-and-the-queens')}} />
            </div>    
            <p className="category-description">{t('overview-description-1')}</p>

            <h6 className="category-heading"><b>{t('overview-events')}</b></h6>
            <div className="description-image-container left fete">
                <img className="description-image" src={FeteDeLaMusique} alt="Fête de la Musique" />         
                <div dangerouslySetInnerHTML={{__html: t('fete-de-la-musique')}} />
            </div>
            <p className="category-description">{t('overview-description-2')}</p>
            
            <h6 className="category-heading margin"><b>{t('overview-global')}</b></h6>
            <div className="category-description" dangerouslySetInnerHTML={{__html: t('overview-description-3')}} />
            <iframe className="music-iframe" width="100%" height="370" src="https://www.youtube.com/embed/-XyLecY2JyE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    )
}