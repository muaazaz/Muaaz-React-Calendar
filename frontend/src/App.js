import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/404";
import CreateEvent from "./components/CreateEvent";
import CreateAllday from "./components/CreateAllday";
import Events from "./components/Events";
import EditEvents from "./components/EditEvents";
import EditAllday from "./components/EditAlldayEvents";
import PublicRoutes from "./components/Routes/Public";
import PrivateRoutes from "./components/Routes/Private";
import CalendarProvider from "./components/Context/CalendarContext";

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
