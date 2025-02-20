import { useTranslation } from 'react-i18next';
import RightColumn from '../../components/rightColumn/rightColumn';
import './attractions.css';

export default function Attractions() {
    const { t } = useTranslation(['common', 'attractions']);

    return (
        <div className="content"> 
            <title>Attractions | L'Hexagone</title>
            <div className="left">
                <h2><b>{t('visit.attractions')}</b></h2>
            </div>
            <RightColumn />
        </div>
    )
}