import './home.css';
import Image from '../../assets/images/home-road.jpg';
import RightColumn from '../../components/rightColumn/rightColumn';
import MonteCarloSpringArts from "../../assets/images/monte-carlo-spring-arts.jpg";
import BanlieuesBleues from '../../assets/images/banlieues-bleues.jpg';
import ParisJazz from '../../assets/images/paris-jazz.jpg';
import CognacBluesPassions from '../../assets/images/cognac-blues-passions.jpg';
import Beatles from '../../assets/images/beatles.jpg';
import JMusicFestival from '../../assets/images/j-music-festival.jpg';
import { useTranslation } from 'react-i18next';

const images = [JMusicFestival, MonteCarloSpringArts, BanlieuesBleues, Beatles, ParisJazz, CognacBluesPassions];

export default function Home() {
    const { t } = useTranslation(['common', 'music']);
    
    const events = t('list-events', { ns: "music", returnObjects: true });

    const date = new Date();
    const frenchDate = date.toLocaleDateString("sv", {timeZone: "Europe/Paris"});

    return (
        <div className="content"> 
            <title>Home | L'Hexagone</title>
            <div className="left">
                <h2><b>Bienvenue!</b></h2>
                <img id="winding-road" src={Image} alt="Winding Countryside Road with Village" />
            </div>
            <RightColumn>
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