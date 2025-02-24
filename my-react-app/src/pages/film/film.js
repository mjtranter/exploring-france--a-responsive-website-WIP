import './film.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import RightColumn from '../../components/rightColumn/rightColumn';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Overview from './overview/overview';
import History from './history/history';
import Events from './events/events';

export default function Film() {
    const { t } = useTranslation(['common', 'film']);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || 'overview';

    const categories = [{id: "Overview", t: "overview"}, {id: "History", t: "history"}, {id: "Events", t: "events"}];
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.t === categoryParam) || categories[0]);

    useEffect(() => {
        setSearchParams({category: selectedCategory.t});
        window.scrollTo(0,0);
    }, [selectedCategory, setSearchParams]);

    const components = [Overview, History, Events];

    return (
        <div className="content"> 
            <title>Film | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"film"} categories={categories} title={"media.film"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"film"} selectedCategory={selectedCategory} Component={components[categories.findIndex(obj => obj.id === selectedCategory.id)]} />
            </div>
            <RightColumn />
        </div>
    )
}