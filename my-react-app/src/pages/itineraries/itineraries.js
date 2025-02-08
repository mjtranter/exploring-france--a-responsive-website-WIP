import { useTranslation } from 'react-i18next';
import './itineraries.css';

export default function Itineraries() {
    const { t } = useTranslation(['common', 'itineraries']);

    return (
        <div className="content"> 
            <title>Itineraries | Explore France</title>
            <div className="left">
                <h2><b>{t('visit.itineraries')}</b></h2>
            </div>
        </div>
    )
}