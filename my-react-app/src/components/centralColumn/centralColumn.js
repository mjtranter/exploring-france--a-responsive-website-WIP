import { useTranslation } from 'react-i18next';
import './centralColumn.css';

export default function CentralColumn({ns, children}) {
    const { t } = useTranslation(ns);

    return (
        <div className="central-column">
            <div className="central-children">
                {children}
            </div>
        </div>
    )
}