import './centralColumn.css';
import { useTranslation } from 'react-i18next';

export default function CentralColumn({ns, selectedCategory, Component}) {
    const { t } = useTranslation(['common', ns]);

    return (
        <div className="central-column">
            <h4>{t(selectedCategory.t, { ns: ns })}</h4>
            <Component />
        </div>
    )
}