import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory()
    const handleClick = ()=>{
        history.push('/calendar')
    }
    return ( 
        <div className="home">
             <img src="https://media3.giphy.com/avatars/gifcalendar/a5CM8bx5vWk0.gif" alt=""></img>
             <button className="clnd" onClick={handleClick}>View Calendar</button>
        </div>
     );
}
 
export default Home;