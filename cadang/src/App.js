import LoginPage from "./pages/LoginPage";
import { Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import * as React from "react"
import TopBar from './components/util/TopBar'
import BottomNav from "./components/util/BottomNav";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
<<<<<<< HEAD
import SearchCafePage from "./pages/SearchCafePage";
=======
import MonthReportPage from "./pages/MonthReportPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
>>>>>>> 96bb0251877a44fe197d7253149d4d701c0e0452

function App() {
  // const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <TopBar/>
      <Switch>
        <Route exact path="/sign_in" component={LoginPage} />
        <Route exact path="/sign_up" component={RegisterPage} />
        <Route exact path="/main" component={MainPage}/>
        <Route exact path="/searchcafe" component={SearchCafePage}/>
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/month_report" component={MonthReportPage}/>
        <Route exact path="/weekly-report" component={WeeklyReportPage}/>
      </Switch>
      <BottomNav/>
    </div>
  );
}

export default App;