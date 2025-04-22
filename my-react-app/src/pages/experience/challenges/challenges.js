import './challenges.css';
import { useTranslation } from 'react-i18next';

export default function Challenges() {
    const ns = "experience";
    const { t } = useTranslation(ns);

    return (
        <div className="category-component">
            <div className="challenge-container">
                <div className="challenge-description">
                    <h5 className="category-heading"><b>{t('large-landmarks')}</b></h5>
                    <p className="challenge-text"><b>{t('large-landmarks-description')}</b></p>
                    <p className="challenge-small-text">{t('large-landmarks-trivia-1')}</p>
                    <p className="challenge-small-text">{t('large-landmarks-trivia-2')}</p>
                </div>
                <iframe title="Youtube Video Player" src="https://www.google.com/maps/embed?pb=!4v1745279183757!6m8!1m7!1sioXVDEFZv93UEOOO5oHvIg!2m2!1d48.87442543861812!2d2.294421316043235!3f153.3192154442312!4f0.7583019438053356!5f0.7820865974627469" width="500" height="375" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className="challenge-container">
                <div className="dual-challenge-description">
                    <h5 className="category-heading"><b>{t('lets-meet')}</b></h5>
                    <p className="dual-challenge-text"><b>{t('lets-meet-description')}</b></p>
                </div>
                <div className="streetview-row">
                    <iframe title="Youtube Video Player" src="https://www.google.com/maps/embed?pb=!4v1745329182988!6m8!1m7!1sdNO13nEYuNJF2uR3--FvLA!2m2!1d44.72595735597001!2d3.836661252583446!3f282.24260187087793!4f-4.390612337037311!5f0.7820865974627469" width="500" height="375" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <iframe title="Youtube Video Player" src="https://www.google.com/maps/embed?pb=!4v1745329389613!6m8!1m7!1sJ-BsXxjoU0ouLkE5aKiI9A!2m2!1d44.72656729888849!2d3.85461097513735!3f159.80377395491644!4f4.308444318470265!5f0.7820865974627469" width="500" height="375" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>   

                <div className="streetview-row">
                    <p className="dual-challenge-small-text">{t('lets-meet-trivia-1')}</p>
                    <p className="dual-challenge-small-text">{t('lets-meet-trivia-2')}</p>
                </div>   
            </div>

            <div className="challenge-container bottom">
                <div className="challenge-description">
                    <h5 className="category-heading"><b>{t('its-an-emergency')}</b></h5>
                    <p className="challenge-text"><b>{t('its-an-emergency-description')}</b></p>
                    <p className="challenge-small-text">{t('its-an-emergency-trivia-1')}</p>
                    <p className="challenge-small-text bottom">{t('its-an-emergency-trivia-2')}</p>
                </div>
                <iframe title="Youtube Video Player" src="https://www.google.com/maps/embed?pb=!4v1745332429827!6m8!1m7!1sBT4Wl28I6LIDjKIFfM8ISA!2m2!1d48.77179446474741!2d5.165771252712859!3f290.210292905103!4f-5.121794331276561!5f0.7820865974627469" width="500" height="375" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}