import './attractions.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function Attractions() {
    const ns = "attractions";
    const { t } = useTranslation([ns, "common"]);    

    useEffect(() => {
        document.title = t('title');
    });

    return (
        <div className="content"> 
            <div className="left">
                <h2><b>{t('under-maintenance', { ns: 'common' })}</b></h2>
            </div>
            <RightColumn />
        </div>
    )
}