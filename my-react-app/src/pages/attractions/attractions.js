import './attractions.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Attractions() {
    const { t } = useTranslation(['common', 'attractions']);

    const categories = [{id: "1", t: ""}, {id: "2", t: ""}, {id: "3", t: ""}];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="content"> 
            <title>Attractions | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"attractions"} categories={categories} title={"visit.attractions"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"attractions"} selectedCategory={selectedCategory} />
            </div>
            <RightColumn />
        </div>
    )
}