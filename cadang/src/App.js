import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import * as React from "react"
import TopBar from "./components/util/TopBar"
import BottomNav from "./components/util/BottomNav"
import logo from "./assets/logo.png"

import PageLayout from "./components/util/PageLayout"
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import SearchCafePage from "./pages/SearchCafePage";
import MonthReportPage from "./pages/MonthReportPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import IntroPage from "./pages/IntroPage";
import InfoPage from "./pages/InfoPage";
import TextSearchPage from "./pages/TextSearchPage";
import CustomPage from "./pages/CustomPage";
import PaymentPage from "./pages/PaymentPage"
import TestPage from "./pages/TestPage"


function App() {
  // const [{ user }, dispatch] = useStateValue();

  // NavBar 필요 없는 페이지 정의
  const IntroContainer = () => (
    <div>
      {/* img fixed 옵션으로 바꿀지?? */}
      <img height={75} src={logo} alt="커피" />
      <Switch>
        <Route exact path="/" component={IntroPage}></Route>
        <Route exact path="/sign_in" component={LoginPage} />
        <Route exact path="/sign_up" component={RegisterPage} />
        <Route exact path="/info" component={InfoPage} />
      </Switch>
    </div>
  )

  // NavBar 필요한 페이지 정의
  const DefaultContainer = () => (
    <div>
      <PageLayout>
      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/searchcafe" component={SearchCafePage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/month_report" component={MonthReportPage} />
        <Route exact path="/weekly-report" component={WeeklyReportPage} />
        <Route exact path="/text-search" component={TextSearchPage} />
        {/* custom page 프렌차이즈 pk와 메뉴 pk url에 넣어서 접근해야하는지?? */}
        <Route exact path="/custom" component={CustomPage} />
        <Route exact path="/payment" component={PaymentPage}/>
        <Route exact path="/test" component={TestPage}/>
      </Switch>
      </PageLayout>
    </div>
  )

  // Intro 페이지는 Nav 없는곳으로 렌더링
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={IntroContainer} />
          <Route exact path="/sign_in" component={IntroContainer} />
          <Route exact path="/sign_up" component={IntroContainer} />
          <Route exact path="/image_signup" component={IntroContainer} />
          <Route exact path="/info" component={IntroContainer} />

          <Route component={DefaultContainer} />
          <Route exact path="/text-search" component={DefaultContainer} />
          <Route exact path="/custom" component={DefaultContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
