import { useTranslation } from 'react-i18next';
import RightColumn from '../../components/rightColumn/rightColumn';
import './events.css';

export default function Events() {
    const { t } = useTranslation(['common', 'events']);

    return (
        <div className="content"> 
            <title>Events | L'Hexagone</title>
            <div className="left">
                <h2><b>{t('visit.events')}</b></h2>
            </div>
            <RightColumn />
        </div>
    )
}