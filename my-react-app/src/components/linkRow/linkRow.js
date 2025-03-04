import './linkRow.css';
import Spotify from '../../assets/images/spotify.png';
import Apple from '../../assets/images/apple-music.svg';
import Amazon from '../../assets/images/amazon-music.svg';
import Youtube from '../../assets/images/youtube_social_icon_red.png';
import { useContext } from 'react';
import { CountryCodeContext } from '../../App';

export default function LinkRow({type, data}) {
    const countryCode = useContext(CountryCodeContext);

    const spotifyLink = type === "playlist" ? "https://open.spotify.com/playlist/" + data.spotify : "https://open.spotify.com/track/" + data.spotify;
    const appleLink = type === "playlist" ? "https://music.apple.com/" + countryCode + "/playlist/" + data.apple : "https://music.apple.com/" + countryCode + "/album/" + data.apple;
    const amazonLink = type === "playlist" ? data.amazon : data.amazon[countryCode];
    const youtubeLink = type === "playlist" ? "https://youtube.com/playlist?list=" + data.youtube : "https://youtu.be/" + data.youtube;

    return (
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
    )
}