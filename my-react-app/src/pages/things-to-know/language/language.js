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

const clips = [Sortie, Entree, Caisse, Toilettes, Interdit, Ouvert, Ferme, Poussez, Tirez, DefenseDeFumer, AccesInterdit, IssueDeSecours, HorairesDouverture, ParkingInterdit, Stop, Weekend, Bonjour, Bonsoir, Salut, AuRevoir, Merci, MerciBeaucoup, DeRien, SilVousPlait, ExcusezMoi, JeSuisDesole, JeVoudrais, AvezVous, OuEst, OuSontLesToilettes, AuSecours, ParlezVousAnglais, ParlezVousJaponais, Salut, FaireDuShopping, EnAvoirMarre, Descendre];

export default function Language() {
    const ns = "things-to-know";
    const { t } = useTranslation(ns);

    useEffect(() => {
        document.title = t('language-title');
    });

    //source: https://stackoverflow.com/a/2450976
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

    const [fixedCommonSignsTerms, setFixedCommonSignsTerms] = useState([]);
    const [fixedUsefulPhrasesTerms, setFixedUsefulPhrasesTerms] = useState([]);

    useEffect(() => {
        const commonSigns = t('common-signs-terms', { returnObjects: true });
        const usefulPhrases = t('useful-phrases-terms', { returnObjects: true });

        setFixedCommonSignsTerms(t('common-signs-terms', { returnObjects: true }));
        setFixedUsefulPhrasesTerms(t('useful-phrases-terms', { returnObjects: true }));

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
    
    const [currentlyPlaying, setCurrentlyPlaying] = useState(-1);
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
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">{t('french')}</th>
                                <th scope="col">{t('current-language-capital')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fixedCommonSignsTerms.map(commonSignsTerm => (
                                <tr>
                                    <td>
                                        <div className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: commonSignsTerm.id, clip: clips[commonSignsTerm.id - 1]})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === commonSignsTerm.id ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            {commonSignsTerm.front}
                                        </div>
                                    </td>
                                    <td>{commonSignsTerm.back}</td>
                                </tr>
                            ))}                                   
                        </tbody>
                    </table>
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
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">{t('french')}</th>
                                <th scope="col">{t('current-language-capital')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fixedUsefulPhrasesTerms.map(usefulPhrasesTerm => (
                                <tr>
                                    <td>
                                        <div className="phrase-sound">
                                            <button className="btn-song-preview phrase" onClick={() => handleCurrentlyPlaying({id: usefulPhrasesTerm.id, clip: clips[usefulPhrasesTerm.id - 1]})}>
                                                <span class="material-symbols-outlined">{currentlyPlaying === usefulPhrasesTerm.id ? "stop_circle" : "play_circle"}</span>
                                            </button>
                                            {usefulPhrasesTerm.front}
                                        </div>
                                    </td>
                                    <td>{usefulPhrasesTerm.back}</td>
                                </tr>
                            ))}                                   
                        </tbody>
                    </table>
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