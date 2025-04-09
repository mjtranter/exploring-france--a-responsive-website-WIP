import React, { useState, useEffect } from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from '../sortableItem/sortableItem';
import { useTranslation } from 'react-i18next';

export default function Tour({tourLocations, setTourLocations}) {
    const ns = "film";
    const { t } = useTranslation(ns);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const filmingLocations = t('filming-locations', { returnObjects: true });
    const tempTourLocations = tourLocations.map(tourLocation => {
        for (const filmingLocation of filmingLocations) {
            const location = filmingLocation.locations.find(item => item.id === tourLocation);
            if (location) return location;
        }
    });
    
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tempTourLocations.map(tourLocation => tourLocation.id)} strategy={verticalListSortingStrategy}>
                {tempTourLocations.map((tourLocation, index) => <SortableItem key={tourLocation.id} id={tourLocation.id} text={tourLocation.linkText} index={index+1} tourLocations={tempTourLocations} setTourLocations={setTourLocations} />)}
            </SortableContext>
        </DndContext>
    );
  
    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setTourLocations((oldLocations) => {
                const oldIndex = oldLocations.indexOf(active.id);
                const newIndex = oldLocations.indexOf(over.id);
                
                const newList = arrayMove(oldLocations, oldIndex, newIndex);

                localStorage.setItem("tourLocations", JSON.stringify(newList));
                return newList;
            });
        }
    } 
}