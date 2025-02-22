import './profile.css';
import { useTranslation } from 'react-i18next';

export default function Profile({ns, image, name}) {
    const { t } = useTranslation(['common', ns]);

    return (
        <div className="profile-icon">
            <img className="icon" src={image} alt="Stromae" />
            <h5 className="profile-name">{name}</h5>
        </div>
    )
}