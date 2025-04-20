import AccordionComponent from "../../../components/accordion/accordion";

export default function Overview() {
    const ns = "things-to-know";

    return (
        <div className="category-component">
            <AccordionComponent ns={ns} />
        </div>
    )
}