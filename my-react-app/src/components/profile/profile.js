import './profile.css';
import { useTranslation } from 'react-i18next';

export default function Profile({ns, image, name}) {
    const { t } = useTranslation(['common', ns]);

    return (
        <div className="profile-icon">
            <img className="icon" src={image} alt={name} />
            <h6 className="profile-name">{name}</h6>
        </div>
    )
}