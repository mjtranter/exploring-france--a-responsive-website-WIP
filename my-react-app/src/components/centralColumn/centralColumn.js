import { useTranslation } from 'react-i18next';
import './centralColumn.css';
import Overview from '../../pages/music/overview/overview';

export default function CentralColumn({ns, selectedCategory}) {
    const { t } = useTranslation(['common', ns]);

    return (
        <div className="central-column">
            <h4>{t(selectedCategory.t, { ns: ns })}</h4>
            <Overview ns="music" />
        </div>
    )
}