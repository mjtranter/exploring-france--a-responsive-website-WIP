import './centralColumn.css';
import { useTranslation } from 'react-i18next';

export default function CentralColumn({ns, selectedCategory, Component}) {
    const { t } = useTranslation(['common', ns]);

    const centralClass = ns === "things-to-know" ? "full" : "";

    return (
        <div className={"central-column " + centralClass}>
            <h4><b>{t(selectedCategory.t, { ns: ns })}</b></h4><br />
            <Component />
        </div>
    )
}