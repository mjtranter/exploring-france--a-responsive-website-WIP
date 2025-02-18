import './music.css';
import '../../index.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import Recommendation from '../../components/recommendation/recommendation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Music() {
    const { t } = useTranslation(['common', 'music']);

    const categories = [{id: "Overview", t: "overview"}, {id: "Popular Artists", t: "popular-artists"}, {id: "Festivals", t: "festivals"}, {id: "Radio Stations", t: "radio-stations"}];

    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

    return (
        <div className="content">
            <title>Music | Explore France</title>
            <div className="left">
                <LeftColumn ns={"music"} categories={categories} title={"media.music"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"music"}>
                    <div className="music-content">
                        {selectedCategory}
                    </div>
                </CentralColumn>
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