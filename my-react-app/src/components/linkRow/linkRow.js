import './linkRow.css';
import Spotify from '../../assets/images/spotify.png';
import Apple from '../../assets/images/apple-music.svg';
import Amazon from '../../assets/images/amazon-music.svg';
import Youtube from '../../assets/images/youtube_social_icon_red.png';
import IMDb from '../../assets/images/imdb.png';
import Letterboxd from '../../assets/images/letterboxd.png';
import JustWatch from '../../assets/images/justwatch.png';
import { useContext } from 'react';
import { CountryCodeContext } from '../../App';

export default function LinkRow({type, data}) {
    const countryCode = useContext(CountryCodeContext);

    let imdbLink;
    let letterboxdLink;
    let justwatchLink;

    let spotifyLink;
    let appleLink;
    let amazonLink;
    let youtubeLink;    

    if (type === "film") {
        imdbLink = data.imdb;
        letterboxdLink = data.letterboxd;
        const ukCountryCode = countryCode === "gb" ? "uk" : countryCode;
        const movieTag = countryCode === "jp" ? "/映画/" : "/movie/"
        justwatchLink = "https://justwatch.com/" + ukCountryCode + movieTag + data.justwatch;
    }

    else {
        spotifyLink = type === "playlist" ? "https://open.spotify.com/playlist/" + data.spotify : "https://open.spotify.com/track/" + data.spotify;
        appleLink = type === "playlist" ? "https://music.apple.com/" + countryCode + "/playlist/" + data.apple : "https://music.apple.com/" + countryCode + "/album/" + data.apple;
        amazonLink = type === "playlist" ? data.amazon : data.amazon[countryCode];
        youtubeLink = type === "playlist" ? "https://youtube.com/playlist?list=" + data.youtube : "https://youtu.be/" + data.youtube;
    }

    return (
        <>
            {(type === "song" || type === "playlist") && (
                <div className={"link-row " + type}>
                    <a href={spotifyLink} target="_blank" rel="noreferrer">
                        <img className={"link " + type} src={Spotify} alt="Spotify Link" />
                    </a>
                    <a href={appleLink} target="_blank" rel="noreferrer">
                        <img className={"link " + type} src={Apple} alt="Apple Music Link" />
                    </a>
                    <a href={amazonLink} target="_blank" rel="noreferrer">
                        <img className={"link " + type} src={Amazon} alt="Amazon Music Link" />
                    </a>
                    <a href={youtubeLink} target="_blank" rel="noreferrer">
                        <img className={"link " + type} src={Youtube} alt="Youtube Link" />
                    </a>
                </div>
            )}

            {type === "film" && (
                <div className={"link-row " + type}>
                    <a href={imdbLink} target="_blank" rel="noreferrer">
                        <img className={"link " + type} src={IMDb} alt="IMDb Link" />
                    </a>
                    <a href={letterboxdLink} target="_blank" rel="noreferrer">
                        <img className={"link " + type} src={Letterboxd} alt="Letterboxd Link" />
                    </a>
                    <a href={justwatchLink} target="_blank" rel="noreferrer">
                        <img className={"link " + type} src={JustWatch} alt="JustWatch Link" />
                    </a>
                </div>
            )}
        </>
    )
}