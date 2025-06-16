import './music.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import Recommendation from '../../components/recommendation/recommendation';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';
import { CountryCodeContext } from '../../App';
import { useSearchParams } from 'react-router-dom';

import Overview from './overview/overview';
import Foundations from './foundations/foundations';
import Events from './events/events';
import Listen from './listen/listen';

import MyFrenchFilmFestival from '../../assets/images/my-french-film-festival.jpg';
import JMusicFestival from '../../assets/images/j-music-festival.jpg';
import CesarAwards from '../../assets/images/cesar-awards.jpg';
import MonteCarloSpringArts from "../../assets/images/monte-carlo-spring-arts.jpg";
import BanlieuesBleues from '../../assets/images/banlieues-bleues.jpg';
import FrenchFilmFestivalYokohama from '../../assets/images/french-film-festival-yokohama.jpg';
import BonjourFrance from '../../assets/images/bonjour-france.jpg';
import Beatles from '../../assets/images/beatles.jpg';
import CannesFilmFestival from '../../assets/images/cannes-film-festival.jpg';
import FrenchConnections from '../../assets/images/french-connections.jpg';
import AnnecyInternational from '../../assets/images/annecy-international.jpg';
import FrancosDeMontreal from '../../assets/images/francos-de-montreal.jpg';
import ParisJazz from '../../assets/images/paris-jazz.jpg';
import FrancophoneDayParty from '../../assets/images/francophone-day-party.jpg';
import CognacBluesPassions from '../../assets/images/cognac-blues-passions.jpg';
import DinardFilmFestival from '../../assets/images/dinard-film-festival.jpg';
import Cinemania from '../../assets/images/cinemania.jpg';
import HanabiSeasons from '../../assets/images/hanabi-seasons.jpg';
import FrenchFilmFestivalUK from '../../assets/images/french-film-festival-uk.jpg';

const images = [MyFrenchFilmFestival, JMusicFestival, CesarAwards, MonteCarloSpringArts, BanlieuesBleues, FrenchFilmFestivalYokohama, BonjourFrance, Beatles, CannesFilmFestival, FrenchConnections, AnnecyInternational, FrancosDeMontreal, ParisJazz, FrancophoneDayParty, CognacBluesPassions, DinardFilmFestival, Cinemania, HanabiSeasons, FrenchFilmFestivalUK];

export default function Music() {
    const { t } = useTranslation(['common', 'music']);

    const countryCode = useContext(CountryCodeContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || 'overview';

    const categories = [{id: "Overview", t: "overview"}, {id: "Foundations", t: "foundations"}, {id: "Events", t: "events"}, {id: "Listen", t: "listen"}];
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.t === categoryParam) || categories[0]);

    useEffect(() => {
        setSearchParams(oldParams => {
            const newParams = new URLSearchParams(oldParams);
            newParams.set("category", selectedCategory.t);
            return newParams;
        });
        window.scrollTo(0,0);
    }, [selectedCategory, setSearchParams]);

    const components = [Overview, Foundations, Events, Listen];

    const events = t('list-events', { ns: "events", returnObjects: true });

    const date = new Date();
    const frenchDate = date.toLocaleDateString("sv", {timeZone: "Europe/Paris"});

    const [top10, setTop10] = useState([]);
        
    useEffect(() => {
        fetch("/api/fetchChart")
        .then(response => response.json())
        .then(data => setTop10(data))
        .catch(error => console.log("There was an error fetching top 10!"));
    }, []);

    const [currentlyPlaying, setCurrentlyPlaying] = useState(-1);
    const [audio, setAudio] = useState(null);

    const handleCurrentlyPlaying = (song) => {
        if (currentlyPlaying === song.id) {
            //if the song playing is the one whose play/stop button was clicked then stop playing
            audio.pause();
            setCurrentlyPlaying(0);
        }
        else {
            //pause song currently playing before starting new one
            if (audio) audio.pause();

            const preview = new Audio(song.preview);
            preview.play();
            setAudio(preview);
            setCurrentlyPlaying(song.id);

            //reset once preview is over
            preview.onended = () => setCurrentlyPlaying(0);
        }
    }

    return (
        <div className="content">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <title>Music | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"music"} categories={categories} title={"media.music"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"music"} selectedCategory={selectedCategory} Component={components[categories.findIndex(obj => obj.id === selectedCategory.id)]} />
            </div>
            <RightColumn>
                <Recommendation ns={"music"} type={"music"} />
                <div className="chart">
                    <h5 className="top-10"><b>{t('top-10', { ns: "music" })}</b></h5>
                    {top10.length > 0 && (top10.map((song, index) => (
                        <div key={song.id} className="song-frame">
                            <div className="song-position">
                                <p className="song-position-text">{index + 1}</p>
                            </div>
                            <img className="song-cover" src={song.album.cover} alt={song.title} />
                            <div className="song-details">
                                <div className="song-content">
                                    <div className="song-title-container">
                                        <p className="song-title"><b>{song.title}</b></p>
                                    </div>
                                    <p className="song-artist">{song.artist.name}</p>
                                </div>
                                <div className="song-preview">
                                    <button className="btn-song-preview" onClick={() => handleCurrentlyPlaying(song)}>
                                        <span class="material-symbols-outlined preview">{currentlyPlaying === song.id ? "stop_circle" : "play_circle"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>

                {events.filter(event => {
                    if (!event.type.includes("music") || event.start > frenchDate || event.end <= frenchDate) return false;
                    if (event.country.includes("France") || (event.connection === countryCode && event.country !== "France")) return true;
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