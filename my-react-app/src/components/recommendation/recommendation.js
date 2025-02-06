import './recommendation.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useTranslation } from 'react-i18next';


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

    return (
        <div className="rec-box">
            <div className="text-row">
                <h5 className="left-text"><b>{t('todays-song')}</b></h5>
                <h5 className="right-text"><b>{formattedDate}</b></h5>
            </div>
            <iframe title="song" src="https://open.spotify.com/embed/track/3Mcxi78U3lCjt8DMKa6YY4?utm_source=generator&theme=0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    )
}