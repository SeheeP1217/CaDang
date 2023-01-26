import LoginPage from "./pages/LoginPage";
import { Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import * as React from "react"
import TopBar from './components/util/TopBar'
import BottomNav from "./components/util/BottomNav";

function App() {
  // const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <TopBar/>
      <Switch>
        <Route exact path="/sign_in" component={LoginPage} />
        <Route exact path="/sign_up" component={RegisterPage} />
      </Switch>
      <BottomNav/>
    </div>
  );
}

export default App;
