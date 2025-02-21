import './recommendation.css';
import Spotify from '../../assets/images/spotify.png';
import Apple from '../../assets/images/apple-music.svg';
import Amazon from '../../assets/images/amazon-music.svg';
import Youtube from '../../assets/images/youtube_social_icon_red.png';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { CountryCodeContext } from '../../App';

export default function Recommendation({ns}) {
    const { t, i18n } = useTranslation(ns);
    const date = new Date();
    const options = {
        timeZone: "Europe/Paris",
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat(i18n.language, options).format(date);
    //use Swedish date as it is YYYY-MM-DD and using French would swap day and month
    const frenchDate = new Date(date.toLocaleString("sv", {timeZone: "Europe/Paris"}));

    // source: https://stackoverflow.com/a/55717984
    const startDate = new Date("2025-02-09");
    const timeDifference = frenchDate.getTime() - startDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let songs = require('../../assets/songs.json');
    const songId = dayDifference % songs.length;
    const song = songs[songId];

    const countryCode = useContext(CountryCodeContext);

    return (
        <div className="rec-box">
            <div className="text-row">
                <h5 className="left-text"><b>{t('todays-song')}</b></h5>
                <h5 className="right-text"><b>{formattedDate}</b></h5>
            </div>
            <iframe title="song" src={'https://open.spotify.com/embed/track/' + song.spotify.substring(0,22) + '?utm_source=generator&theme=0'} allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <div className="link-row">
                <a href={'https://open.spotify.com/track/' + song.spotify} target="_blank" rel="noreferrer">
                    <img className="link" src={Spotify} alt="Spotify Link" />
                </a>
                <a href={'https://music.apple.com/' + countryCode + '/album/' + song.apple} target="_blank" rel="noreferrer">
                    <img className="link" src={Apple} alt="Apple Music Link" />
                </a>
                <a href={song.amazon[countryCode]} target="_blank" rel="noreferrer">
                    <img className="link" src={Amazon} alt="Amazon Music Link" />
                </a>
                <a href={'https://youtu.be/' + song.youtube} target="_blank" rel="noreferrer">
                    <img className="link" src={Youtube} alt="Youtube Link" />
                </a>
            </div>
        </div>
    )
}