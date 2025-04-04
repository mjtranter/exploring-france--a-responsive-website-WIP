import './overview.css';
import Lumieres from '../../../assets/images/lumieres.jpg';
import CesarAward from '../../../assets/images/cesar-award.jpg';
import { useTranslation } from 'react-i18next';

export default function Overview() {
    const ns = "film";
    const { t } = useTranslation(ns);

    return (
        <div className="category-component">
            <div className="overview-container">
                <div className="description-image-container left">
                    <img className="description-image" src={Lumieres} alt="Lumière Brothers" />
                    <div dangerouslySetInnerHTML={{__html: t('lumiere-brothers')}} />
                </div>    
                <p className="category-description">{t('overview-description-1')}</p>
            </div>

            <div className="overview-container">
                <h6 className="category-heading"><b>{t('overview-heading-1')}</b></h6>
                <div className="description-image-container right fete">
                    <img className="description-image" src={CesarAward} alt="César Award" />         
                    <div dangerouslySetInnerHTML={{__html: t('cesar-award')}} />
                </div>
                <p className="category-description">{t('overview-description-2')}</p>
            </div>

            <div>
                <h6 className="category-heading"><b>{t('overview-heading-2')}</b></h6>
                <div className="category-description" dangerouslySetInnerHTML={{__html: t('overview-description-3')}} />
            </div>
        </div>
    )
}