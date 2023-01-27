import LoginPage from "./pages/LoginPage";
import { Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import * as React from "react"
import TopBar from './components/util/TopBar'
import BottomNav from "./components/util/BottomNav";
<<<<<<< HEAD
import MyPage from "./pages/MyPage";
=======
import MainPage from "./pages/MainPage";
>>>>>>> 37778e2448f0520b2101322c83a6f9bd8d994c79

function App() {
  // const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <TopBar/>
      <Switch>
        <Route exact path="/sign_in" component={LoginPage} />
        <Route exact path="/sign_up" component={RegisterPage} />
        <Route exact path="/mypage" component={MyPage} />
      </Switch>
      <MainPage/>
      <BottomNav/>
    </div>
  );
}

export default App;
