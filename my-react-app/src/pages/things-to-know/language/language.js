import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Button from '../../../components/button/button';
import FlipCard from '../../../components/flipCard/flipCard';
import Sortie from '../../../assets/audio/sortie.mp3';
import Entree from '../../../assets/audio/entree.mp3';
import Caisse from '../../../assets/audio/caisse.mp3';
import Toilettes from '../../../assets/audio/toilettes.mp3';
import Interdit from '../../../assets/audio/interdit.mp3';
import Ouvert from '../../../assets/audio/ouvert.mp3';
import Ferme from '../../../assets/audio/ferme.mp3';
import Poussez from '../../../assets/audio/poussez.mp3';
import Tirez from '../../../assets/audio/tirez.mp3';
import DefenseDeFumer from '../../../assets/audio/defense-de-fumer.mp3';
import AccesInterdit from '../../../assets/audio/acces-interdit.mp3';
import IssueDeSecours from '../../../assets/audio/issue-de-secours.mp3';
import HorairesDouverture from '../../../assets/audio/horaires-douverture.mp3';

import ParkingInterdit from '../../../assets/audio/parking-interdit.mp3';
import Stop from '../../../assets/audio/stop.mp3';
import Weekend from '../../../assets/audio/weekend.mp3';

import Bonjour from '../../../assets/audio/bonjour.mp3';
import Bonsoir from '../../../assets/audio/bonsoir.mp3';
import Salut from '../../../assets/audio/salut.mp3';
import AuRevoir from '../../../assets/audio/au-revoir.mp3';
import Merci from '../../../assets/audio/merci.mp3';
import MerciBeaucoup from '../../../assets/audio/merci-beaucoup.mp3';
import DeRien from '../../../assets/audio/de-rien.mp3';
import SilVousPlait from '../../../assets/audio/sil-vous-plait.mp3';
import ExcusezMoi from '../../../assets/audio/excusez-moi.mp3';
import JeSuisDesole from '../../../assets/audio/je-suis-desole.mp3';
import JeVoudrais from '../../../assets/audio/je-voudrais.mp3';
import AvezVous from '../../../assets/audio/avez-vous.mp3';
import OuEst from '../../../assets/audio/ou-est.mp3';
import OuSontLesToilettes from '../../../assets/audio/ou-sont-les-toilettes.mp3';
import AuSecours from '../../../assets/audio/au-secours.mp3';
import ParlezVousAnglais from '../../../assets/audio/parlez-vous-anglais.mp3';
import ParlezVousJaponais from '../../../assets/audio/parlez-vous-japonais.mp3';

import FaireDuShopping from '../../../assets/audio/faire-du-shopping.mp3';
import EnAvoirMarre from '../../../assets/audio/en-avoir-marre.mp3';
import Descendre from '../../../assets/audio/descendre.mp3';

import './language.css';

export default function Language() {
    const ns = "things-to-know";
    const { t, i18n } = useTranslation(ns);

    // source: https://stackoverflow.com/a/2450976
    const shuffle = (array) => {
        let currentIndex = array.length;

        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const [signsFilterSelected, setSignsFilterSelected] = useState("Learn");

    const changeSignsFilter = (filter) => {
        setSignsFilterSelected(filter);
    }

    const [phrasesFilterSelected, setPhrasesFilterSelected] = useState("Learn");

    const changePhrasesFilter = (filter) => {
        setPhrasesFilterSelected(filter);
    }

    const [commonSignsTerms, setCommonSignsTerms] = useState([]);
    const [usefulPhrasesTerms, setUsefulPhrasesTerms] = useState([]);

    useEffect(() => {
        const commonSigns = t('common-signs-terms', { returnObjects: true });
        const usefulPhrases = t('useful-phrases-terms', { returnObjects: true });

        setCommonSignsTerms(shuffle([...commonSigns]));
        setUsefulPhrasesTerms(shuffle([...usefulPhrases]));
    }, [t]);

    const [activeSignsIndex, setActiveSignsIndex] = useState(0);
    const [activePhrasesIndex, setActivePhrasesIndex] = useState(0);

    const prevSignsFlashcard = () => {
        setActiveSignsIndex(prevActiveSignsIndex => (prevActiveSignsIndex - 1 + commonSignsTerms.length) % commonSignsTerms.length);
    }

    const nextSignsFlashcard = () => {
        setActiveSignsIndex(prevActiveSignsIndex => (prevActiveSignsIndex + 1) % commonSignsTerms.length);
    }

    const prevPhrasesFlashcard = () => {
        setActivePhrasesIndex(prevActivePhrasesIndex => (prevActivePhrasesIndex - 1 + usefulPhrasesTerms.length) % usefulPhrasesTerms.length);
    }

    const nextPhrasesFlashcard = () => {
        setActivePhrasesIndex(prevActivePhrasesIndex => (prevActivePhrasesIndex + 1) % usefulPhrasesTerms.length);
    }    
    
    const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
    const [audio, setAudio] = useState(null);

    const handleCurrentlyPlaying = (phrase) => {
        if (currentlyPlaying === phrase.id) {
            if (audio) audio.pause();
            setCurrentlyPlaying(0);
        }
        else {
            if (audio) audio.pause();

            const clip = new Audio(phrase.clip);
            clip.play();
            setAudio(clip);
            setCurrentlyPlaying(phrase.id);

            clip.onended = () => setCurrentlyPlaying(0);
        }
    }

    return (
        <div className="language-component">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div className="common-signs">
                <h5 className="category-heading"><b>{t('common-signs')}</b></h5>
                <div className="events-filter">
                    <Button type={signsFilterSelected === "Learn" ? "filter selected" : "filter"} text={t('learn')} onClick={() => changeSignsFilter("Learn")} />
                    <Button type={signsFilterSelected === "Practise" ? "filter selected" : "filter"} text={t('practise')} onClick={() => changeSignsFilter("Practise")} />
                </div><br />
                {signsFilterSelected === "Learn" && (
                    <>
                        {(i18n.resolvedLanguage === "en" || i18n.resolvedLanguage === "ja") && (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">{t('french')}</th>
                                        <th scope="col">{t('current-language-capital')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 1, clip: Sortie})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 1 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Sortie
                                        </td>
                                        <td>{t('exit')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 2, clip: Entree})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 2 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Entrée
                                        </td>
                                        <td>{t('entrance')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 3, clip: Caisse})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 3 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Caisse
                                        </td>
                                        <td>{t('checkout')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 4, clip: Toilettes})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 4 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Toilettes
                                        </td>
                                        <td>{t('toilets')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 5, clip: Interdit})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 5 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Interdit
                                        </td>
                                        <td>{t('forbidden')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 6, clip: Ouvert})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 6 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Ouvert
                                        </td>
                                        <td>{t('open')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 7, clip: Ferme})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 7 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Fermé
                                        </td>
                                        <td>{t('closed')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 8, clip: Poussez})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 8 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Poussez
                                        </td>
                                        <td>{t('push')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 9, clip: Tirez})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 9 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Tirez
                                        </td>
                                        <td>{t('pull')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 10, clip: DefenseDeFumer})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 10 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Défense de fumer
                                        </td>
                                        <td>{t('no-smoking')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 11, clip: AccesInterdit})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 11 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Accès interdit
                                        </td>
                                        <td>{t('no-entry')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 12, clip: IssueDeSecours})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 12 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Issue de secours
                                        </td>
                                        <td>{t('emergency-exit')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 13, clip: HorairesDouverture})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 13 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Horaires d'ouverture
                                        </td>
                                        <td>{t('opening-hours')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
            
                        {i18n.resolvedLanguage === "fr" && (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Français</th>
                                        <th scope="col">Québécois</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 14, clip: ParkingInterdit})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 14 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Parking interdit
                                        </td>
                                        <td>Stationnement interdit</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 15, clip: Stop})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 15 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Stop
                                        </td>
                                        <td>Arrêt</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 16, clip: Weekend})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 16 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Week-end
                                        </td>
                                        <td>Fin de semaine</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </>
                )}

                {signsFilterSelected === "Practise" && (
                    <div>
                        <div className="flashcard-container">
                            {/* source: https://blog.bitsrc.io/simple-carousel-in-react-2aac73887243 */}
                            <div className="flashcard-slider" style={{ transform: `translateX(-${activeSignsIndex * 100}%)` }}>
                                {commonSignsTerms.map(commonSignsTerm => (
                                    <FlipCard key={commonSignsTerm.id} type="terms" front={commonSignsTerm.front} back={commonSignsTerm.back} />
                                ))}
                            </div>
                        </div>

                        <div className="flashcard-arrows">
                        <button className="btn-flashcard-arrow" onClick={prevSignsFlashcard}><h3><b>&#8592;</b></h3><p className="back-text">{t('back')}</p></button>
                        <button className="btn-flashcard-arrow" onClick={nextSignsFlashcard}><p className="next-text">{t('next')}</p><h3><b>&#8594;</b></h3></button>
                        </div>
                    </div>
                )}
            </div>

            <div className="useful-phrases">
                <h5 className="category-heading"><b>{t('useful-phrases')}</b></h5>
                <div className="events-filter">
                    <Button type={phrasesFilterSelected === "Learn" ? "filter selected" : "filter"} text={t('learn')} onClick={() => changePhrasesFilter("Learn")} />
                    <Button type={phrasesFilterSelected === "Practise" ? "filter selected" : "filter"} text={t('practise')} onClick={() => changePhrasesFilter("Practise")} />
                </div><br />
                {phrasesFilterSelected === "Learn" && (
                    <>
                        {(i18n.resolvedLanguage === "en" || i18n.resolvedLanguage === "ja") && (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">{t('french')}</th>
                                        <th scope="col">{t('current-language-capital')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 17, clip: Bonjour})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 17 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Bonjour
                                        </td>
                                        <td>{t('hello')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 18, clip: Bonsoir})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 18 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Bonsoir
                                        </td>
                                        <td>{t('good-evening')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 19, clip: Salut})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 19 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Salut
                                        </td>
                                        <td>{t('hi')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 20, clip: AuRevoir})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 20 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Au revoir
                                        </td>
                                        <td>{t('goodbye')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 21, clip: Merci})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 21 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Merci
                                        </td>
                                        <td>{t('thank-you')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 22, clip: MerciBeaucoup})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 22 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Merci beaucoup
                                        </td>
                                        <td>{t('thank-you-very-much')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 23, clip: DeRien})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 23 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            De rien
                                        </td>
                                        <td>{t('youre-welcome')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 24, clip: SilVousPlait})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 24 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            S'il vous plaît
                                        </td>
                                        <td>{t('please')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 25, clip: ExcusezMoi})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 25 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Excusez-moi
                                        </td>
                                        <td>{t('excuse-me')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 26, clip: JeSuisDesole})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 26 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Je suis désolé(e)
                                        </td>
                                        <td>{t('sorry')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 27, clip: JeVoudrais})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 27 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Je voudrais...
                                        </td>
                                        <td>{t('i-would-like')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 28, clip: AvezVous})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 28 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Avez-vous... ?
                                        </td>
                                        <td>{t('do-you-have')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 29, clip: OuEst})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 29 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Où est... ?
                                        </td>
                                        <td>{t('where-is')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 30, clip: OuSontLesToilettes})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 30 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Où sont les toilettes ?
                                        </td>
                                        <td>{t('where-are-the-toilets')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 31, clip: AuSecours})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 31 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Au secours !
                                        </td>
                                        <td>{t('help')}</td>
                                    </tr>
                                    <tr>
                                        <td className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 32, clip: i18n.resolvedLanguage === "en" ? ParlezVousAnglais : ParlezVousJaponais})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === 32 ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            Parlez-vous {t('current-language')} ?
                                        </td>
                                        <td>{t('do-you-speak')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
            
                        {i18n.resolvedLanguage === "fr" && (
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Français</th>
                                    <th scope="col">Québécois</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="phrase-sound">
                                        <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 33, clip: Salut})}>
                                            <span class="material-symbols-outlined">{currentlyPlaying === 33 ? "stop_circle" : "play_circle"}</span>
                                        </button>
                                        Salut
                                    </td>
                                    <td>Allô</td>
                                </tr>
                                <tr>
                                    <td className="phrase-sound">
                                        <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 34, clip: FaireDuShopping})}>
                                            <span class="material-symbols-outlined">{currentlyPlaying === 34 ? "stop_circle" : "play_circle"}</span>
                                        </button>
                                        Faire du shopping
                                    </td>
                                    <td>Magasiner</td>
                                </tr>
                                <tr>
                                    <td className="phrase-sound">
                                        <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 35, clip: EnAvoirMarre})}>
                                            <span class="material-symbols-outlined">{currentlyPlaying === 35 ? "stop_circle" : "play_circle"}</span>
                                        </button>
                                        En avoir marre
                                    </td>
                                    <td>Être tanné(e)</td>
                                </tr>
                                <tr>
                                    <td className="phrase-sound">
                                        <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: 36, clip: Descendre})}>
                                            <span class="material-symbols-outlined">{currentlyPlaying === 36 ? "stop_circle" : "play_circle"}</span>
                                        </button>
                                        Descendre (d'un véhicule)
                                    </td>
                                    <td>Débarquer</td>
                                </tr>
                            </tbody>
                            </table>
                        )}
                    </>
                )}

                {phrasesFilterSelected === "Practise" && (
                    <div>
                        <div className="flashcard-container">
                            {/* source: https://blog.bitsrc.io/simple-carousel-in-react-2aac73887243 */}
                            <div className="flashcard-slider" style={{ transform: `translateX(-${activePhrasesIndex * 100}%)` }}>
                                {usefulPhrasesTerms.map(usefulPhrasesTerm => (
                                    <FlipCard key={usefulPhrasesTerm.id} type="terms" front={usefulPhrasesTerm.front} back={usefulPhrasesTerm.back} />
                                ))}
                            </div>
                        </div>

                        <div className="flashcard-arrows">
                        <button className="btn-flashcard-arrow" onClick={prevPhrasesFlashcard}><h3><b>&#8592;</b></h3><p className="back-text">{t('back')}</p></button>
                        <button className="btn-flashcard-arrow" onClick={nextPhrasesFlashcard}><p className="next-text">{t('next')}</p><h3><b>&#8594;</b></h3></button>
                        </div>
                    </div>
                )}
            </div>

            <div className="punctuation">
                <h5 className="category-heading"><b>{t('punctuation')}</b></h5>
                <p className="punctuation-text">{t('punctuation-text')}</p>
                <div className="modal-body">
                    <ul>
                        <li>{t('semi-colon')}</li>
                        <li>{t('exclamation-mark')}</li>
                        <li>{t('question-mark')}</li>
                        <li>{t('colon')}</li>
                        <li>{t('quotation-marks')}</li>
                        <li>{t('percentage-sign')}</li>
                        <li>{t('currency-symbols')}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}