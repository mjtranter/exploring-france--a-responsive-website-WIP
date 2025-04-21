import './experience.css';
import LeftColumn from '../../components/leftColumn/leftColumn';
import CentralColumn from '../../components/centralColumn/centralColumn';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Challenges from './challenges/challenges';
import Webcams from './webcams/webcams';

export default function Experience() {
    const { t } = useTranslation(['common', 'experience']);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || '';

    const categories = [{id: "Challenges", t: "challenges"}, {id: "Webcams", t: "webcams"}];
    const [selectedCategory, setSelectedCategory] = useState(categories.find(category => category.t === categoryParam) || categories[0]);

    useEffect(() => {
        setSearchParams(oldParams => {
            const newParams = new URLSearchParams(oldParams);
            newParams.set("category", selectedCategory.t);
            return newParams;
        });
        window.scrollTo(0,0);
    }, [selectedCategory, setSearchParams]);

    const components = [Challenges, Webcams];

    return (
        <div className="content">
            <title>Experience | L'Hexagone</title>
            <div className="left">
                <LeftColumn ns={"experience"} categories={categories} title={"explore.experience"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CentralColumn ns={"experience"} selectedCategory={selectedCategory} Component={components[categories.findIndex(obj => obj.id === selectedCategory.id)]} />
            </div>
        </div>
    )
}