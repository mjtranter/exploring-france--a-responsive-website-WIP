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
                <div className="chart">
                    <h5><b>Top 10</b></h5>
                    {/*<iframe title="chart" src="https://open.spotify.com/embed/playlist/37i9dQZEVXbIPWwFssbupI?utm_source=generator&theme=0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />*/}
                </div>
            </RightColumn>
            
        </div>
    )
}