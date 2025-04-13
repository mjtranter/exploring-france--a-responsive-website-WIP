import './events.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Events() {
    const ns = "events";
    const { t } = useTranslation([ns, "common"]);    

    return (
        <div className="content"> 
            <title>Events | L'Hexagone</title>
            <div className="left">
                <h2><b>{t('under-maintenance', { ns: 'common' })}</b></h2>
            </div>
            <RightColumn />
        </div>
    )
}