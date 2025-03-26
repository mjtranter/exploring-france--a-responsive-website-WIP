import './music.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import Recommendation from '../../components/recommendation/recommendation';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Overview from './overview/overview';
import Foundations from './foundations/foundations';
import Events from './events/events';
import Listen from './listen/listen';
import { useSearchParams } from 'react-router-dom';
import MonteCarloSpringArts from "../../assets/images/monte-carlo-spring-arts.jpg";
import BanlieuesBleues from '../../assets/images/banlieues-bleues.jpg';
import ParisJazz from '../../assets/images/paris-jazz.jpg';
import CognacBluesPassions from '../../assets/images/cognac-blues-passions.jpg';
import Beatles from '../../assets/images/beatles.jpg';
import JMusicFestival from '../../assets/images/j-music-festival.jpg';

const images = [JMusicFestival, MonteCarloSpringArts, BanlieuesBleues, Beatles, ParisJazz, CognacBluesPassions];

export default function Music() {
    const { t } = useTranslation(['common', 'music']);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || 'overview';

    const categories = [{id: "Overview", t: "overview"}, {id: "Foundations", t: "foundations"}, {id: "Events", t: "events"}, {id: "Listen", t: "listen"}];
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.t === categoryParam) || categories[0]);

    useEffect(() => {
        setSearchParams({category: selectedCategory.t});
        window.scrollTo(0,0);
    }, [selectedCategory, setSearchParams]);

    const components = [Overview, Foundations, Events, Listen];

    const events = t('list-events', { ns: "music", returnObjects: true });

    const date = new Date();
    const frenchDate = date.toLocaleDateString("sv", {timeZone: "Europe/Paris"});

    const [top10, setTop10] = useState([]);
        
    useEffect(() => {
        fetch("/api/fetchChart")
        .then(response => response.json())
        .then(data => setTop10(data))
        .catch(error => console.log("There was an error fetching top 10!"));
    }, []);

    return (
        <div className="content">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=play_circle" />
            <title>Music | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"music"} categories={categories} title={"media.music"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"music"} selectedCategory={selectedCategory} Component={components[categories.findIndex(obj => obj.id === selectedCategory.id)]} />
            </div>
            <RightColumn>
                <Recommendation ns={"music"} />
                <div className="chart">
                    <h5><b>Top 10</b></h5>
                    {top10.length > 0 && (top10.map((song, index) => (
                        <div key={song.id} className="song-frame">
                            <div className="song-position">
                                <p className="song-position-text">{index + 1}</p>
                            </div>
                            <img className="song-cover" src={song.album.cover} alt={song.title} />
                            <div className="song-content">
                                <p className="song-title"><b>{song.title}</b></p>
                                <p className="song-artist">{song.artist.name}</p>
                            </div>
                            <div className="song-preview">
                                <span class="material-symbols-outlined">play_circle</span>
                            </div>
                        </div>
                    )))}
                </div>

                {events.filter(event => {
                    if (event.start <= frenchDate && event.end > frenchDate) return true;

                    return false;
                })
                .map(event => (
                    <div key={event.id} className="right-column-event-frame">
                        <img className="right-column-event-icon" src={images[event.id - 1]} alt={event.text} />
                        <h6 className="right-column-event-title"><b>{event.text}</b></h6>
                        <p><i>{event.longDate}</i></p>
                    </div>
                ))}
            </RightColumn>
        </div>
    )
}