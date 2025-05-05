import Carousel from 'react-bootstrap/Carousel';
import Button from '../button/button';
import Locations from '../../assets/images/locations-spotlight.jpg';
import EiffelTower from '../../assets/images/eiffel-tower.jpg';
import MoulinDeVernon from '../../assets/images/moulin-de-vernon.jpg';
import Annecy from '../../assets/images/annecy.jpg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './spotlightCarousel.css';

const images = [Locations, EiffelTower, MoulinDeVernon, Annecy];
const links = ['/film?category=locations', '/', '/', '/'];

const getFullPath = (path) => {
    const countrySim = new URLSearchParams(window.location.search).get("countrySim");
    if (countrySim) return `${path}&countrySim=${countrySim}`;
    return path;
}

export default function SpotlightCarousel() {
    const { t } = useTranslation("common");
    const navigate = useNavigate();
    
    const spotlights = t('spotlights', { returnObjects: true });


    return (
        <Carousel>
            {spotlights.map(spotlight => (
                <Carousel.Item key={spotlight.id}>
                    <img src={images[spotlight.id - 1]} alt={spotlight.title} />
                    <Carousel.Caption>
                        <h3 className="carousel-title"><b>{spotlight.title}</b></h3>
                        <div className="btn-view-more">
                            <Button type="default" text={t('view-more')} onClick={() => navigate(getFullPath(links[spotlight.id - 1]))} />
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}