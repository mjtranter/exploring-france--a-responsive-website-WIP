import { useTranslation } from 'react-i18next';
import './centralColumn.css';

export default function CentralColumn({ns, selectedCategory}) {
    const { t } = useTranslation(['common', ns]);

    return (
        <div className="central-column">
            <h4>{t(selectedCategory.t, { ns: ns })}</h4>
        </div>
    )
}