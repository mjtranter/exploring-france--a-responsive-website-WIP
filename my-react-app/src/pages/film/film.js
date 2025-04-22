import './film.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Overview from './overview/overview';
import History from './history/history';
import Events from './events/events';
import Locations from './locations/locations';
import Recommendation from '../../components/recommendation/recommendation';

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

export default function Film() {
    const { t } = useTranslation(['common', 'film']);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || 'overview';

    const categories = [{id: "Overview", t: "overview"}, {id: "History", t: "history"}, {id: "Events", t: "events"}, {id: "Locations", t: "locations"}];
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.t === categoryParam) || categories[0]);

    useEffect(() => {
        setSearchParams(oldParams => {
            const newParams = new URLSearchParams(oldParams);
            newParams.set("category", selectedCategory.t);
            return newParams;
        });
        window.scrollTo(0,0);
    }, [selectedCategory, setSearchParams]);

    const components = [Overview, History, Events, Locations];

    const date = new Date();
    const frenchDate = date.toLocaleDateString("sv", {timeZone: "Europe/Paris"});

    const events = t('list-events', { ns: "events", returnObjects: true });

    return (
        <div className="content"> 
            <title>Film | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"film"} categories={categories} title={"media.film"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"film"} selectedCategory={selectedCategory} Component={components[categories.findIndex(obj => obj.id === selectedCategory.id)]} />
            </div>
            <RightColumn>
                <Recommendation ns={"film"} type={"film"} />

                {events.filter(event => {
                    if (event.start <= frenchDate && event.end > frenchDate && event.type.includes("film")) return true;

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