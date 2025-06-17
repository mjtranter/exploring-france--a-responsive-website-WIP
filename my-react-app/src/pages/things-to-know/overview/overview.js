import AccordionComponent from "../../../components/accordion/accordion";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";

export default function Overview() {
    const ns = "things-to-know";
    const { t } = useTranslation(ns);

    useEffect(() => {
        document.title = t('overview-title');
    });

    return (
        <div className="category-component">
            <AccordionComponent ns={ns} type="overview" />
        </div>
    )
}