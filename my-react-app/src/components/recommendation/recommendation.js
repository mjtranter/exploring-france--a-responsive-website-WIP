import './recommendation.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useTranslation } from 'react-i18next';

export default function Recommendation() {
    const { t } = useTranslation();

    return (
        <div className="rec-box">
            <iframe title="song" src="https://open.spotify.com/embed/track/3Mcxi78U3lCjt8DMKa6YY4?utm_source=generator&theme=0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    )
}