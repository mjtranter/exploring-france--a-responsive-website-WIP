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
import CesarAwards from '../../assets/images/cesar-awards.jpg';
import AnnecyInternational from '../../assets/images/annecy-international.jpg';
import CannesFilmFestival from '../../assets/images/cannes-film-festival.jpg';
import DinardFilmFestival from '../../assets/images/dinard-film-festival.jpg';
import HanabiSeasons from '../../assets/images/hanabi-seasons.jpg';

const images = [MyFrenchFilmFestival, CesarAwards, AnnecyInternational, CannesFilmFestival, DinardFilmFestival, HanabiSeasons];

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

    const events = t('list-events', { ns: "film", returnObjects: true });

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