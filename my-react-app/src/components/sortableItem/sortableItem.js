import {useSortable} from '@dnd-kit/sortable';
import './sortableItem.css';
import {CSS} from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';

export function SortableItem(props) {
    const ns = "film";
    const { t } = useTranslation(ns);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: props.id});
    
    const style = { transform: CSS.Transform.toString(transform), transition };

    const index = props.index === 1 ? t('start') : props.index === props.tourLocations.length ? t('end') : props.index - 1;

    const getWidthClass = (text) => {
        switch (text) {
            case "出発":
                return "ja";
            case "Départ": 
                return "fr";
            default:
                return "en";
        }
    }

    const widthClass = getWidthClass(t('start'));

    const removeItem = (itemID) => {
        const tempLocations = props.tourLocations.filter(item => item.id !== itemID).map(item => item.id);
        props.setTourLocations(tempLocations);
        localStorage.setItem("tourLocations", JSON.stringify(tempLocations));
    }
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="sortable-item">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0..1,0" />
            <div className="sortable-item-row">
                <p className={"sortable-item-position " + widthClass}><b>{index}</b></p>
                <p className="sortable-item-text">{props.text}</p>
                <button type="button" className="btn-remove-item" onPointerDown={(e) => e.stopPropagation()} onClick={() => removeItem(props.id)}>
                    <span key={props.id + "-" + props.tourLocations.some(item => item.id === props.id)} className={"material-symbols-outlined remove"}>do_not_disturb_on</span>
                </button>
            </div>
        </div>
    );
}