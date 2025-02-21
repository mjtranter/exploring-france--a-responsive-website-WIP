import './itineraries.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Itineraries() {
    const { t } = useTranslation(['common', 'itineraries']);

    const categories = [{id: "", t: ""}, {id: "", t: ""}, {id: "", t: ""}];
    
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="content"> 
            <title>Itineraries | L'Hexagone</title>
           <div className="left">
                <LeftColumn ns={"itineraries"} categories={categories} title={"visit.itineraries"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"itineraries"} selectedCategory={selectedCategory} />
            </div>
            <RightColumn />
        </div>
    )
}