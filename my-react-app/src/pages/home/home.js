import './home.css';
import Image from '../../assets/images/home-road.jpg';
import RightColumn from '../../components/rightColumn/rightColumn';

export default function Home() {
    return (
        <div className="content"> 
            <title>Home | Explore France</title>
            <div className="left">
                <h2><b>Bienvenue!</b></h2>
                <img id="winding-road" src={Image} alt="Winding Countryside Road with Village" />
            </div>
            <RightColumn />
        </div>
    )
}