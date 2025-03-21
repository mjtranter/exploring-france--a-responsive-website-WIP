import './listen.css';
import { useTranslation } from 'react-i18next';
import DanceHouse from '../../../assets/images/dance-house-cover.jpg';
import Electronic from '../../../assets/images/electronic-cover.jpg';
import Pop from '../../../assets/images/pop-cover.jpg';
import Chanson from '../../../assets/images/chanson-cover.jpg';
import LinkRow from '../../../components/linkRow/linkRow';
import ORTF from '../../../assets/images/ORTF.svg';
import Button from '../../../components/button/button';
import Popup from '../../../components/popup/popup';
import { useState, useContext } from 'react';
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
    
    const [popupData, setPopupData] = useState({type: "connection", title: "", content: "", ns: ns, visible: false});
    
    const showPopup = (title, content) => {
        setPopupData({type: "connection", title, content, ns: ns, visible: true});
    }

    const hidePopup = () => {
        setPopupData({...popupData, visible: false});
    }
    
    return (
        <div className="category-component">
            <div className={"overlay" + (popupData.visible ? " visible" : "")}></div>
            <div className={"popup-container" + (popupData.visible ? " visible": "")}>
                <Popup {...popupData} hidePopup={hidePopup} />
            </div>

            <h5 className="category-heading"><b>{t('radio')}</b></h5>
            
            <img className="ORTF-logo" src={ORTF} alt="ORTF logo" />
            <div className="category-description" dangerouslySetInnerHTML={{__html: t('radio-description-1')}} />
            <p className="category-description">{t('radio-description-2')}</p>
            <p className="category-description">{t('radio-description-3')}</p>

            <h6 className="category-heading"><b className="heading-text">L'exception Française</b>{countryCode === "ca" && (<Button type="connection" text={t('view-connection')} onClick={() => showPopup('connection-ca', 'radio-connection-ca')} />)}</h6>
            <p className="category-description">{t('radio-description-4')}</p>  
            <p className="category-description">{t('radio-description-5')}</p>
            
            <h6 className="category-heading"><b>{t('popular-stations')}</b></h6>
            <div className="modal-body">
                <ul>
                    <li><i>France Inter</i> - {t('france-inter')}</li>
                    <li><i>franceinfo</i> - {t('franceinfo')}</li>
                    <li><i>Europe 1</i> - {t('europe-1')}</li>
                    <li><i>NRJ</i> - {t('nrj')}</li>
                    <li><i>Nostalgie</i> - {t('nostalgie')}</li>
                    <li><i>Fip</i> - {t('fip')}</li>
                    <li><i>Chérie FM</i> - {t('cherie-fm')}</li>
                </ul>
            </div>
            <br />
            <p className="category-description">{t('radio-suggestions')}</p>

            <a href="https://www.radio.net/country/france" target="_blank" rel="noreferrer"><b>Radio.net</b></a><br />
            <a href={"https://onlineradiobox.com/fr/?lang=" + (countryCode === "ca" ? "fr" : (countryCode === "jp" ? "ja" : "en"))} target="_blank" rel="noreferrer"><b>OnlineRadioBox</b></a>

            <h5 className="category-heading divider"><b>{t('curated-playlists')}</b></h5>
            <p className="category-description">{t('curated-playlists-description')}</p>

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