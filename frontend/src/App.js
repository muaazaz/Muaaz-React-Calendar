import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Pages/Signup";
import Login from "./components/Pages/Login";
import Logout from "./components/Pages/Logout";
import NotFound from "./components/Pages/404";
import CreateEvent from "./components/Pages/CreateEvent";
import CreateAllday from "./components/Pages/CreateAllday";
import EditEvents from "./components/Pages/EditEvents";
import EditAllday from "./components/Pages/EditAlldayEvents";
import PublicRoutes from "./components/Routes/Public";
import PrivateRoutes from "./components/Routes/Private";
import CalendarProvider from "./components/Context/CalendarContext";
import Events from "./components/Pages/Events"

function App() {
  return (
    <div className="App">
      <CalendarProvider>
        <Router>
          <Navbar />
          <Switch>
            <PublicRoutes exact path={"/"} component={Home} />
            <PublicRoutes path={"/signup"} component={Signup} />
            <PublicRoutes path={"/login"} component={Login} />

            <PrivateRoutes path={"/logout"} component={Logout} />
            <PrivateRoutes path={"/calendar"} component={Events} />
            <PrivateRoutes path={"/create/event"} component={CreateEvent} />
            <PrivateRoutes path={"/create/alldayevent"} component={CreateAllday}/>
            <PrivateRoutes path={"/events/edit/:id"} component={EditEvents} />
            <PrivateRoutes path={"/alldayevents/edit/:id"} component={EditAllday}/>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </CalendarProvider>
    </div>
  );
}

export default App;
