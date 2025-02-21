import './profile.css';
import { useTranslation } from 'react-i18next';

export default function Profile({ns}) {
    const { t } = useTranslation(['common', ns]);

    return (
        <div>
            <h4>{ns}</h4>
        </div>
    )
}