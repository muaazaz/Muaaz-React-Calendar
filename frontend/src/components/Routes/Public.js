import {Route} from 'react-router-dom';
const PublicRoutes = ({path, component}) => {
    return (  
            <Route exact={true} path={path} component={component}/>
     );
}
 
export default PublicRoutes;