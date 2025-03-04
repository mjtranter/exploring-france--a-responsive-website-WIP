import './recommendation.css';
import { useTranslation } from 'react-i18next';
import LinkRow from '../linkRow/linkRow';

export default function Recommendation({ns}) {
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
    //use Swedish date as it is YYYY-MM-DD and using French would swap day and month
    const frenchDate = new Date(date.toLocaleString("sv", {timeZone: "Europe/Paris"}));

    // source: https://stackoverflow.com/a/55717984
    const startDate = new Date("2025-02-08");
    const timeDifference = frenchDate.getTime() - startDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let songs = require('../../assets/songs.json');
    const songId = dayDifference % songs.length;
    const song = songs[songId];

    return (
        <div className="rec-box">
            <div className="text-row">
                <h5 className="left-text"><b>{t('todays-song')}</b></h5>
                <h5 className="right-text"><b>{formattedDate}</b></h5>
            </div>
            <iframe title="song" className="rec-iframe" src={'https://open.spotify.com/embed/track/' + song.spotify.substring(0,22) + '?utm_source=generator&theme=0'} allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <LinkRow type="recommendation" data={song} />
        </div>
    )
}