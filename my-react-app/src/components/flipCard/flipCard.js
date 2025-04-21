import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import './flipCard.css';

export default function FlipCard({type, front, back}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped}>
                <div className={"card flip-card front " + type} onClick={handleFlip}>
                    <h3><b>{front}</b></h3>
                </div>

                <div className={"card flip-card back " + type} onClick={handleFlip}>
                    {back}
                </div>
            </ReactCardFlip>
        </div>
    )
}