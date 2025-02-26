import './essentials.css';
import Profile from '../../../components/profile/profile';

//import images
import DaftPunk from '../../../assets/images/daft-punk-icon.jpg';
import Justice from '../../../assets/images/justice-icon.jpg';
import Stromae from '../../../assets/images/stromae-icon.jpg';

import Air from '../../../assets/images/air-icon.jpg';
import M83 from '../../../assets/images/m83-icon.jpg';
import JeanMichelJarre from '../../../assets/images/jean-michel-jarre-icon.jpg';

import Angele from '../../../assets/images/angele-icon.jpg';
import MyleneFarmer from '../../../assets/images/mylene-farmer-icon.jpg';
import SergeGainsbourg from '../../../assets/images/serge-gainsbourg-icon.jpg';

import EdithPiaf from '../../../assets/images/edith-piaf-icon.jpg';
import Barbara from '../../../assets/images/barbara-icon.jpg';
import JacquesBrel from '../../../assets/images/jacques-brel-icon.jpg';

import Telephone from '../../../assets/images/telephone-icon.jpg';
import NoirDesir from '../../../assets/images/noir-desir-icon.jpg';
import Indochine from '../../../assets/images/indochine.jpg';

import Gojira from '../../../assets/images/gojira-icon.jpg';
import Alcest from '../../../assets/images/alcest-icon.jpg';
import Trust from '../../../assets/images/trust-icon.jpg';

import Iam from '../../../assets/images/iam-icon.jpg';
import Orelsan from '../../../assets/images/orelsan-icon.jpg';
import Booba from '../../../assets/images/booba-icon.jpg';

import Reinhardt from '../../../assets/images/reinhardt-icon.jpg';
import Grappelli from '../../../assets/images/grappelli-icon.jpg';
import Petrucciani from '../../../assets/images/petrucciani-icon.jpg';

import FrancoiseHardy from '../../../assets/images/francoise-hardy-icon.jpg';
import GeorgesBrassens from '../../../assets/images/georges-brassens-icon.jpg';
import LeForestier from '../../../assets/images/le-forestier-icon.jpg';

import Debussy from '../../../assets/images/debussy-icon.jpg';
import Bizet from '../../../assets/images/bizet-icon.jpg';
import Satie from '../../../assets/images/satie-icon.jpg';

import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { CountryCodeContext } from '../../../App';
import Popup from '../../../components/popup/popup';

export default function Essentials() {
    const ns = "music";
    const { t } = useTranslation(ns);

    const countryCode = useContext(CountryCodeContext);

    return (
        <div className="category-component">
            
            {/*<AccordionComponent />*/}
            <h5 className="genre-title"><b>{t('essentials-genres.titles.dance-house')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.dance-house')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">  
                <div className="profile-container">
                    <Profile ns={ns} image={DaftPunk} name="Daft Punk" />
                    {countryCode === "gb" && (<Popup content={t('profile-connections.daft-punk.en')} title="Connections to the UK" />)}
                    {countryCode === "jp" && (<Popup content={t('profile-connections.daft-punk.jp')} title="Connections to Japan" />)}
                </div>
                
                <Profile ns={ns} image={Justice} name="Justice" />
                <Profile ns={ns} image={Stromae} name="Stromae" />
            </div>
            
            <h5 className="genre-title"><b>{t('essentials-genres.titles.electronic')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.electronic')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={Air} name="Air" />
                <Profile ns={ns} image={M83} name="M83" />
                <Profile ns={ns} image={JeanMichelJarre} name="Jean-Michel Jarre" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.pop')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.pop')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={Angele} name="Angèle" />
                <Profile ns={ns} image={MyleneFarmer} name="Mylène Farmer" />
                <Profile ns={ns} image={SergeGainsbourg} name="Serge Gainsbourg" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.chanson')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.chanson')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={EdithPiaf} name="Édith Piaf" />
                <Profile ns={ns} image={Barbara} name="Barbara" />
                <Profile ns={ns} image={JacquesBrel} name="Jacques Brel" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.rock')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.lorem-ipsum')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={Telephone} name="Téléphone" />
                <Profile ns={ns} image={NoirDesir} name="Noir Désir" />
                <Profile ns={ns} image={Indochine} name="Indochine" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.metal')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.lorem-ipsum')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={Gojira} name="Gojira" />
                <Profile ns={ns} image={Alcest} name="Alcest" />
                <Profile ns={ns} image={Trust} name="Trust" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.rap')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.lorem-ipsum')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={Iam} name="IAM" />
                <Profile ns={ns} image={Orelsan} name="Orelsan" />
                <Profile ns={ns} image={Booba} name="Booba" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.jazz')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.lorem-ipsum')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={Reinhardt} name="Django Reinhardt" />
                <Profile ns={ns} image={Grappelli} name="Stéphane Grappelli" />
                <Profile ns={ns} image={Petrucciani} name="Michel Petrucciani" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.folk')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.lorem-ipsum')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={FrancoiseHardy} name="Françoise Hardy" />
                <Profile ns={ns} image={GeorgesBrassens} name="Georges Brassens" />
                <Profile ns={ns} image={LeForestier} name="Maxime Le Forestier" />
            </div>

            <h5 className="genre-title"><b>{t('essentials-genres.titles.classical')}</b></h5>
            <p className="genre-description">{t('essentials-genres.descriptions.lorem-ipsum')}</p>
            <h6 className="top-artists"><b>{t('top-artists')}</b></h6>
            <div className="profile-row">
                <Profile ns={ns} image={Debussy} name="Claude Debussy" />
                <Profile ns={ns} image={Bizet} name="Georges Bizet" />
                <Profile ns={ns} image={Satie} name="Erik Satie" />
            </div>
        </div>
    )
}