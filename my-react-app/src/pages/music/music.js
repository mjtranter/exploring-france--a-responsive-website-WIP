import './music.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import Recommendation from '../../components/recommendation/recommendation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Music() {
    const { t } = useTranslation(['common', 'music']);

    const categories = [{id: "Overview", t: "overview"}, {id: "Essentials", t: "essentials"}, {id: "Events", t: "events"}, {id: "Listen", t: "listen"}];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="content">
            <title>Music | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"music"} categories={categories} title={"media.music"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"music"} selectedCategory={selectedCategory} />
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