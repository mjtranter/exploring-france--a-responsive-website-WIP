import { useTranslation } from 'react-i18next';
import './centralColumn.css';

export default function CentralColumn({ns, selectedCategory}) {
    const { t } = useTranslation(ns);

    return (
        <div className="central-column">
            <h4>{selectedCategory}</h4>
        </div>
    )
}