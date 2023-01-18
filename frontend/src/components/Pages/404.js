import {Link} from 'react-router-dom'
const NotFound = () => {
    return ( 
        <div className="Not-found">
            <h1>404 Page Not Found</h1>
            <Link to='/'>
            <p>Back to home page....</p>
            </Link>

        </div>
     );
}
 
export default NotFound