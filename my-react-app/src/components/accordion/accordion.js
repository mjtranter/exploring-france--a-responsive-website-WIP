import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from "react-i18next";
import Clock from '../../assets/images/clock.jpg';
import Euro from '../../assets/images/euro.jpg';
import Library from '../../assets/images/library.jpg';
import Pharmacy from '../../assets/images/pharmacy.jpg';
import Culture from '../../assets/images/culture.jpg';
import Dining from '../../assets/images/dining.jpg';

import Visa from '../../assets/images/visa.jpg';
import Plane from '../../assets/images/plane.jpg';
import Train from '../../assets/images/train.jpg';
import Wheelchair from '../../assets/images/wheelchair.jpg';
import './accordion.css';

export default function AccordionComponent({ns, type}){
    const { t } = useTranslation(ns);

    const accordionElements = type === "overview" ? t('overview-elements', { returnObjects: true }) : t('travel-elements', { returnObjects: true });

    const images = type === "overview" ? [Clock, Euro, Library, Pharmacy, Culture, Dining] : [Visa, Plane, Train, Wheelchair];

    return (
        <div className="accordion-layout">
            {accordionElements.map(accordionElement => (
                <Accordion key={accordionElement.id}>
                    <Accordion.Item key={accordionElement.id} eventKey={accordionElement.id}>
                        <img className="accordion-image" src={images[accordionElement.id - 1]} alt={accordionElement.title} />
                        <Accordion.Header>
                            <h5><b>{accordionElement.title}</b></h5>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="modal-body" dangerouslySetInnerHTML={{__html: accordionElement.content}} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
        </div>
    )
}