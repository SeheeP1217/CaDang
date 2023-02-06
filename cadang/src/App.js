import LoginPage from "./pages/UserPages/LoginPage"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/UserPages/RegisterPage"
import * as React from "react"
import TopBar from "./components/util/TopBar"
import BottomNav from "./components/util/BottomNav"
import logo from "./assets/logo.png"

import PageLayout from "./components/util/PageLayout"
import MyPage from "./pages/ReportPages/MyPage"
import MainPage from "./pages/MainPage"
import CafeMapPage from "./pages/OrderPages/CafeMapPage"
import MonthReportPage from "./pages/ReportPages/MonthReportPage"
import WeeklyReportPage from "./pages/ReportPages/WeeklyReportPage"
import IntroPage from "./pages/UserPages/IntroPage"
import InfoPage from "./pages/UserPages/InfoPage"
import DrinkAddPage from "./pages/OrderPages/DrinkAddPage"
import CustomPage from "./pages/OrderPages/CustomPage"
import PaymentPage from "./pages/OrderPages/PaymentPage"
import TestPage from "./pages/TestPage"
import SelectMenuPage from "./pages/OrderPages/SelectMenuPage"
import ReviewPage from "./pages/ReportPages/ReviewPage"
import Error404Page from "./pages/ErrorPages/Error404Page"
import Error500Page from "./pages/ErrorPages/Error500Page"
import CafeCeoPage from "./pages/CafeCeoPage"
import UpdateProfilePage from "./pages/UserPages/UpdateProfilePage"
import SearchIdPage from "./pages/UserPages/SearchIdPage"

function App() {
  // const [{ user }, dispatch] = useStateValue();

  // NavBar 필요 없는 페이지 정의
  const IntroContainer = () => (
    <div>
      {/* img fixed 옵션으로 바꿀지?? */}
      <img height={75} src={logo} alt="커피" />
      <Switch>
        <Route exact path="/" component={IntroPage}></Route>
        <Route exact path="/sign-in" component={LoginPage} />
        <Route exact path="/sign-up" component={RegisterPage} />
        <Route exact path="/info" component={InfoPage} />
        <Route exact path="/cafe-ceo-order" component={CafeCeoPage} />
        <Route exact path="/search-id" component={SearchIdPage} />
      </Switch>
    </div>
  )

  // NavBar 필요한 페이지 정의
  const DefaultContainer = () => (
    <div>
      <PageLayout>
        <Switch>
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/cafe-map" component={CafeMapPage} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/month-report" component={MonthReportPage} />
          <Route exact path="/weekly-report" component={WeeklyReportPage} />
          <Route exact path="/text-search" component={DrinkAddPage} />
          {/* custom page 프렌차이즈 pk와 메뉴 pk url에 넣어서 접근해야하는지?? */}
          <Route exact path="/custom" component={CustomPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/test" component={TestPage} />
          <Route exact path="/selectmenu" component={SelectMenuPage} />
          <Route exact path="/review" component={ReviewPage} />
          <Route exact path="/error404" component={Error404Page} />
          <Route exact path="/error500" component={Error500Page} />
          <Route exact path="/update-profile" component={UpdateProfilePage} />
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
          <Route exact path="/sign-in" component={IntroContainer} />
          <Route exact path="/sign-up" component={IntroContainer} />
          <Route exact path="/image-signup" component={IntroContainer} />
          <Route exact path="/info" component={IntroContainer} />
          <Route exact path="/cafe-ceo-order" component={IntroContainer} />
          <Route exact path="/search-id" component={SearchIdPage} />

          <Route component={DefaultContainer} />
          <Route exact path="/drink-add" component={DefaultContainer} />
          <Route exact path="/custom" component={DefaultContainer} />
          <Route exact path="/selectmenu" component={DefaultContainer} />
          <Route exact path="/review" component={DefaultContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App