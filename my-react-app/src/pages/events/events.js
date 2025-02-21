import './events.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Events() {
    const { t } = useTranslation(['common', 'events']);

    const categories = [{id: "", t: ""}, {id: "", t: ""}, {id: "", t: ""}];
    
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="content"> 
            <title>Events | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"events"} categories={categories} title={"visit.events"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"events"} selectedCategory={selectedCategory} />
            </div>
            <RightColumn />
        </div>
    )
}