import './home.css';
import Image from '../../assets/images/home-road.jpg';

export default function Home() {
    return (
        <div className="content"> 
            <title>Home | Explore France</title>
            <h2>Bienvenue!</h2>
            <img id="winding-road" src={Image} alt="Winding Countryside Road with Village" />
        </div>
    )
}