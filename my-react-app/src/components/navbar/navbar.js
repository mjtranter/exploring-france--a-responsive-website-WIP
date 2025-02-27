import { Link } from 'react-router-dom';
import './navbar.css';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Logo from '../../assets/images/france-outline.png';

export default function Navbar() {
    const { t } = useTranslation();

    const getFlag = () => {
        switch (i18next.resolvedLanguage) {
            case 'ja':
                return 'flag-icon flag-icon-jp';
            case 'fr':
                return 'flag-icon flag-icon-fr';
            default:
                return 'flag-icon flag-icon-gb';
        }
    }

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang);
    }

    return (
        <div className="nav-content">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="logo-container">
                    <img src={Logo} id="logo" alt="Outline of France" />
                    <h3 className="logo-text"><b>L'Hexagone</b></h3>
                </div>
            
            
            {/* source: https://getbootstrap.com/docs/5.3/components/navbar/ */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">{t('home')}</Link></li>
                        <li className="nav-item dropdown"><Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('media.media')}</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/film">{t('media.film')}</Link>
                                <Link className="dropdown-item" to="/music">{t('media.music')}</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown"><Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('visit.visit')}</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/events">{t('visit.events')}</Link>
                                <Link className="dropdown-item" to="/attractions">{t('visit.attractions')}</Link>
                                <Link className="dropdown-item" to="/itineraries">{t('visit.itineraries')}</Link>
                            </div>
                        </li>
                    </ul> 
                </div>    
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown language-select">
                        <Link className="nav-link dropdown-toggle language-dropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><span className={getFlag()}></span>{t('language')}</Link>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                            <button className="dropdown-item" onClick={() => changeLanguage("en")}><span className="flag-icon flag-icon-gb"></span>English</button>
                            <button className="dropdown-item" onClick={() => changeLanguage("fr")}><span className="flag-icon flag-icon-fr"></span>Français</button>
                            <button className="dropdown-item" onClick={() => changeLanguage("ja")}><span className="flag-icon flag-icon-jp"></span>日本語</button>
                        </div>
                    </li>
                </ul>   
            </nav>
        </div>
    )
}