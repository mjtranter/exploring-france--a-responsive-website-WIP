import AccordionComponent from "../../../components/accordion/accordion";

export default function Travel() {
    const ns = "things-to-know";

    return (
        <div className="category-component">
            <AccordionComponent ns={ns} type="travel" />
        </div>
    )
}