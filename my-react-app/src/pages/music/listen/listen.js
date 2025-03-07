import './listen.css';
import { useTranslation } from 'react-i18next';
import DanceHouse from '../../../assets/images/dance-house-cover.jpg';
import Electronic from '../../../assets/images/electronic-cover.jpg';
import Pop from '../../../assets/images/pop-cover.jpg';
import Chanson from '../../../assets/images/chanson-cover.jpg';
import LinkRow from '../../../components/linkRow/linkRow';
import { useContext, useEffect } from 'react';
import { CountryCodeContext } from '../../../App';

export default function Listen() {
    const ns = "music";
    const { t } = useTranslation(ns);

    const countryCode = useContext(CountryCodeContext);

    let amazonCode = "";
    switch (countryCode) {
        case "jp":
           amazonCode = "co.jp";
           break;
        case "ca":
            amazonCode = "ca";
            break;
        default:
            amazonCode = "co.uk";
            break;
    }
    
    const dance_house = {"spotify": "4jNqs0TulD0UASj0Phvkwh", "apple": "25-dance-house/pl.u-kv9l2BdCJqPY0a3", "amazon": "https://music.amazon." + amazonCode + "/user-playlists/5ce8672d9a7349c3b56a87dd6a01a23eengb?marketplaceId=A1F83G8C2ARO7P&musicTerritory=" + countryCode.toUpperCase(), "youtube": "PLoUCL2VUBQ83NPh2530Pwva2X9IlryELd"};
    const electronic = {"spotify": "1OAQ9g6JQ0OmJHy5eZQBo1", "apple": "25-electronic/pl.u-xlyNEpPTJRzNVK7", "amazon": "https://music.amazon." + amazonCode + "/user-playlists/5ce8672d9a7349c3b56a87dd6a01a23eengb?marketplaceId=A1F83G8C2ARO7P&musicTerritory=" + countryCode.toUpperCase(), "youtube": "PLoUCL2VUBQ83NPh2530Pwva2X9IlryELd"};  
    const pop = {"spotify": "7AKy2iPcqvb3vyZLPyKebx", "apple": "25-pop/pl.u-2aoq8yesGBrXpzb", "amazon": "https://music.amazon." + amazonCode + "/user-playlists/5ce8672d9a7349c3b56a87dd6a01a23eengb?marketplaceId=A1F83G8C2ARO7P&musicTerritory=" + countryCode.toUpperCase(), "youtube": "PLoUCL2VUBQ83NPh2530Pwva2X9IlryELd"};
    const chanson = {"spotify": "2tqPb8PYZ20tB0VO45Moyo", "apple": "25-chanson/pl.u-KVXBkP3sLM5jBoe", "amazon": "https://music.amazon." + amazonCode + "/user-playlists/5ce8672d9a7349c3b56a87dd6a01a23eengb?marketplaceId=A1F83G8C2ARO7P&musicTerritory=" + countryCode.toUpperCase(), "youtube": "PLoUCL2VUBQ83NPh2530Pwva2X9IlryELd"};
   
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://uk.radio.net/inc/microsite/js/full.js";
        script.async = true;
        script.id = "radio-de-embedded";

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const france_inter_api_key = process.env.FRANCE_INTER_API_KEY;
    console.log(france_inter_api_key);
    
    return (
        <div className="category-component">
            <h5 className="listen-heading"><b>{t('radio')}</b></h5>
            <a href="https://uk.radio.net/country/france" target="_blank" rel="noreferrer"><b>https://uk.radio.net/country/france</b></a><br />
            <a href="https://onlineradiobox.com/fr/?lang=en" target="_blank" rel="noreferrer"><b>https://onlineradiobox.com/fr/?lang=en</b></a>
            {/*<p className="listen-description radio"><b>In France, there is a law called l'Exception Française</b></p>*/}<br /><br />

            <div className="ng-app-embedded">
                <div ui-view="" className="microsite embedded-radio-player" data-playerwidth="340px" data-playertype="web_embedded" data-playstation="franceinter" data-autoplay="false" data-apikey={france_inter_api_key} />
            </div>
            <noscript>
                <a href="https://uk.radio.net/s/franceinter" target="_blank" rel="noreferrer">France Inter on radio.net</a>
            </noscript>

            <h5 className="listen-heading playlist"><b>{t('curated-playlists')}</b></h5>
            <p className="listen-description">{t('curated-playlists-description')}</p>

            <div className="playlist-row">
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.dance-house')}</b></h5>
                    <img className="playlist-cover" src={DanceHouse} alt="Dance/House Playlist" />
                    <LinkRow type="playlist" data={dance_house} />
                </div>
                
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.electronic')}</b></h5>
                    <img className="playlist-cover" src={Electronic} alt="Electronic Playlist" />
                    <LinkRow type="playlist" data={electronic} />
                </div>
                
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.pop')}</b></h5>
                    <img className="playlist-cover" src={Pop} alt="Pop Playlist" />
                    <LinkRow type="playlist" data={pop} />
                </div>
                
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.chanson')}</b></h5>
                    <img className="playlist-cover" src={Chanson} alt="Chanson Playlist" />
                    <LinkRow type="playlist" data={chanson} />
                </div>
            </div>

            <div className="playlist-row">
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.dance-house')}</b></h5>
                    <img className="playlist-cover" src={DanceHouse} alt="Dance/House Playlist" />
                    <LinkRow type="playlist" data={dance_house} />
                </div>
                
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.electronic')}</b></h5>
                    <img className="playlist-cover" src={Electronic} alt="Electronic Playlist" />
                    <LinkRow type="playlist" data={electronic} />
                </div>
                
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.pop')}</b></h5>
                    <img className="playlist-cover" src={Pop} alt="Pop Playlist" />
                    <LinkRow type="playlist" data={pop} />
                </div>
                
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.chanson')}</b></h5>
                    <img className="playlist-cover" src={Chanson} alt="Chanson Playlist" />
                    <LinkRow type="playlist" data={chanson} />
                </div>
            </div>

            <div className="playlist-row">
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.dance-house')}</b></h5>
                    <img className="playlist-cover" src={DanceHouse} alt="Dance/House Playlist" />
                    <LinkRow type="playlist" data={dance_house} />
                </div>
                
                <div className="vertical-container">
                    <h5 className="playlist-title"><b>{t('genres.titles.electronic')}</b></h5>
                    <img className="playlist-cover" src={Electronic} alt="Electronic Playlist" />
                    <LinkRow type="playlist" data={electronic} />
                </div>
            </div>
        </div>
    )
}