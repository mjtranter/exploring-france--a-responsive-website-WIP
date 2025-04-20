import './things-to-know.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Overview from './overview/overview';
import Language from './language/language';
import Travel from './travel/travel';

export default function ThingsToKnow() {
    const { t } = useTranslation(['common', 'things-to-know']);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || 'overview';

    const categories = [{id: "Overview", t: "overview"}, {id: "Language", t: "language"}, {id: "Travel", t: "travel"}];
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.t === categoryParam) || categories[0]);

    useEffect(() => {
        setSearchParams(oldParams => {
            const newParams = new URLSearchParams(oldParams);
            newParams.set("category", selectedCategory.t);
            return newParams;
        });
        window.scrollTo(0,0);
    }, [selectedCategory, setSearchParams]);

    const components = [Overview, Language, Travel];

    return (
        <div className="content">
            <title>Things to Know | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"things-to-know"} categories={categories} title={"things-to-know"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"things-to-know"} selectedCategory={selectedCategory} Component={components[categories.findIndex(obj => obj.id === selectedCategory.id)]} />
            </div>
        </div>
    )
}