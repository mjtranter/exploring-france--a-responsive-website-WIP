import './recommendation.css';
import { useTranslation } from 'react-i18next';
import LinkRow from '../linkRow/linkRow';

export default function Recommendation({ns, type}) {
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
    const startDate = new Date("2025-02-03");
    const timeDifference = frenchDate.getTime() - startDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let songs = require('../../assets/songs.json');
    const songId = dayDifference % songs.length;
    const song = songs[songId];

    let films = t('films', { ns: "film", returnObjects: true });
    const filmId = Math.floor(dayDifference / 7) % films.length;
    const film = films[filmId];

    return (
        <div className="rec-box">
            {type === "music" && (
                <div>
                    <div className="text-row">
                        <h5><b>{t('todays-song')}</b></h5>
                        <h5><b>{formattedDate}</b></h5>
                    </div>
                    <iframe title="song" className="rec-iframe" src={'https://open.spotify.com/embed/track/' + song.spotify.substring(0,22) + '?utm_source=generator&theme=0'} allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    <LinkRow type="song" data={song} />
                </div>
            )}

            {type === "film" && (
                <div>
                    <h5><b>{t('film-of-the-week')}</b></h5>
                    <div className="film-container">
                        <div className="film-images">
                            <img className="film-poster" src={film.poster} alt={film.title} />
                            <LinkRow type="film" data={film} />
                        </div>
                        <div className="film-content">
                            <div className="text-row">
                                <h5 className="film-title"><b>{film.title}</b></h5>
                                <p className="film-year"><i>{film.year}</i></p>
                            </div>
                            <p className="film-director">{t('directed')} {film.director}</p>
                            <p className="film-description">{film.description}</p>
                        </div>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    )
}