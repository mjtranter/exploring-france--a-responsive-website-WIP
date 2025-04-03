import './itineraries.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Itineraries() {

    return (
        <div className="content"> 
            <title>Itineraries | L'Hexagone</title>
            <div className="left">
                <h2><b>Page Under Maintenance!!</b></h2>
            </div>
            <RightColumn />
        </div>
    )
}