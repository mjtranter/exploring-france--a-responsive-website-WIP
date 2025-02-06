import { useTranslation } from 'react-i18next';
import RightColumn from '../../components/rightColumn/rightColumn';
import './film.css';

export default function Film() {
    const { t } = useTranslation(['common', 'film']);

    return (
        <div className="content"> 
            <title>Film | Explore France</title>
            <div className="left">
                <h2><b>{t('media.film')}</b></h2>
            </div>
            <RightColumn />
        </div>
    )
}