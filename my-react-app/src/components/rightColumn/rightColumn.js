import { useTranslation } from 'react-i18next';
import './rightColumn.css';

export default function RightColumn(props) {
    const { t } = useTranslation();

    return (
        <div className="right-column">
            <h3><b>{t('happening-now')}</b></h3>
            <div className="right-children">
                {props.children}
            </div>
        </div>
    )
}