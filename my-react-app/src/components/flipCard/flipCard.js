import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './flipCard.css';

export default function FlipCard() {
    const ns = "common";
    const { t, i18n } = useTranslation(ns);

    //make sure day number comes in front of month
    const lang = i18n.resolvedLanguage === "en" ? "en-gb" : i18n.language;
    const date = new Date();
    const options = {
        timeZone: "Europe/Paris",
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat(lang, options).format(date);

    const shortOptions = {
        timeZone: "Europe/Paris",
        month: 'numeric',
        day: 'numeric'
    };
    const shortDate = new Intl.DateTimeFormat("en-gb", shortOptions).format(date);

    const onThisDayEvents = t('on-this-day-events', { returnObjects: true });
    const onThisDayEvent = onThisDayEvents.find(event => event.date === shortDate);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div>
            <div className="text-row">
                <h5><b>{t('on-this-day')}</b></h5>
                <h5><b>{formattedDate}</b></h5>
            </div>

            <ReactCardFlip isFlipped={isFlipped}>
                <div className="card flip-card front" onClick={handleFlip}>
                    <h3><b>{t('reveal')}</b></h3>
                </div>

                <div className="card flip-card back" onClick={handleFlip}>
                    {onThisDayEvent.text}
                </div>
            </ReactCardFlip>
        </div>
    )
}