import LoginPage from "./pages/LoginPage";
import { Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import * as React from "react"
import TopBar from './components/util/TopBar'
import BottomNav from "./components/util/BottomNav";
<<<<<<< HEAD
<<<<<<< HEAD
import MyPage from "./pages/MyPage";
=======
import MainPage from "./pages/MainPage";
>>>>>>> 37778e2448f0520b2101322c83a6f9bd8d994c79
=======
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
>>>>>>> 6e6c40c126aa5044762420138d1d5a010de9b0df

function App() {
  // const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <TopBar/>
      <Switch>
        <Route exact path="/sign_in" component={LoginPage} />
        <Route exact path="/sign_up" component={RegisterPage} />
        <Route exact path="/main" component={MainPage}/>
        <Route exact path="/mypage" component={MyPage} />
      </Switch>
      <BottomNav/>
    </div>
  );
}

export default App;
