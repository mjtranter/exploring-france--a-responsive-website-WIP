import './film.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Film() {
    const { t } = useTranslation(['common', 'film']);

    const categories = [{id: "Overview", t: "overview"}, {id: "History", t: "history"}, {id: "Events", t: "events"}];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="content"> 
            <title>Film | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"film"} categories={categories} title={"media.film"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"film"} selectedCategory={selectedCategory} />
            </div>
            <RightColumn />
        </div>
    )
}