import { useTranslation } from 'react-i18next';
import './leftColumn.css';

export default function LeftColumn({ns, categories, title, selectedCategory, setSelectedCategory}) {
    const { t } = useTranslation(['common', ns]);

    categories = categories.map(category => 
        <li key={category.id} className={"category-item"  + (selectedCategory.id === category.id ? " selected" : "")} onClick={() => setSelectedCategory(category)}>{t(category.t, { ns: ns })}</li>
    );

    return (
        <div className="left-column">
            <h2 className="nav-title"><b>{t(title)}</b></h2>
            <div className="categories">
                {categories}
            </div>
        </div>
    )
}