import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AccordionComponent from "../../../components/accordion/accordion";

export default function Travel() {
    const ns = "things-to-know";
    const { t } = useTranslation(ns);

    useEffect(() => {
            document.title = t('travel-title');
        });

    return (
        <div className="category-component">
            <AccordionComponent ns={ns} type="travel" />
        </div>
    )
}