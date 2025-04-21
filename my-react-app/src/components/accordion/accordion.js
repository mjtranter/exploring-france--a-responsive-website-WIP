import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from "react-i18next";
import Clock from '../../assets/images/clock.jpg';
import Euro from '../../assets/images/euro.jpg';
import Library from '../../assets/images/library.jpg';
import Pharmacy from '../../assets/images/pharmacy.jpg';
import Culture from '../../assets/images/culture.jpg';
import Dining from '../../assets/images/dining.jpg';
import './accordion.css';

const images = [Clock, Euro, Library, Pharmacy, Culture, Dining];

export default function AccordionComponent({ns}){
    const { t } = useTranslation(ns);

    const accordionElements = t('accordion-elements', { returnObjects: true });

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