import './essentials.css';
import Profile from '../../../components/profile/profile';

//import images
import Stromae from '../../../assets/images/stromae-icon.jpg';


export default function Essentials({ns}) {
    return (
        <div>
            <Profile ns="music" image={Stromae} name="Stromae" />
        </div>
    )
}