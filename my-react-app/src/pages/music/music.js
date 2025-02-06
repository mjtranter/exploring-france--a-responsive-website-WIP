import './music.css';
import RightColumn from '../../components/rightColumn/rightColumn';
import Recommendation from '../../components/recommendation/recommendation';
import { useTranslation } from 'react-i18next';

export default function Music() {
    const { t } = useTranslation(['common', 'music']);

    return (
        <div className="content">
            <title>Music | Explore France</title>
            <div className="left">
                <h2><b>{t('media.music')}</b></h2>
            </div>
            <RightColumn>
                <Recommendation ns={"music"} />
            </RightColumn>
            
        </div>
    )
}