import LoginPage from "./pages/UserPages/LoginPage"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/UserPages/RegisterPage"
import * as React from "react"
import logo from "./assets/logo.png"

import PageLayout from "./components/util/PageLayout"
import MyPage from "./pages/ReportPages/MyPage"
import MainPage from "./pages/MainPage"
import CafeMapPage from "./pages/OrderPages/CafeMapPage"
import ReportPage from "./pages/ReportPages/ReportPage"
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
import SearchPwPage from "./pages/UserPages/SearchPwPage"
import PaymentReportPage from "./pages/ReportPages/PaymentReportPage"
import LoadingPage from "./pages/LoadingPage"
import PaySuccessPage from "./pages/OrderPages/PaySuccessPage"
import PayFailPage from "./pages/OrderPages/PayFail"
import DailyConsumptionGraph from "./components/util/DailyConsumptionGraph"

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
        <Route exact path="/search-pw" component={SearchPwPage} />

        <Route exact path="/error404" component={Error404Page} />
        <Route exact path="/error500" component={Error500Page} />
        <Route exact path="/loading" component={LoadingPage} />
      </Switch>
    </div>
  )

  // NavBar 필요한 페이지 정의
  const DefaultContainer = () => (
    <PageLayout>
      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/cafe-map" component={CafeMapPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/report" component={ReportPage} />
        <Route exact path="/drink-add" component={DrinkAddPage} />
        <Route exact path="/payment-report" component={PaymentReportPage} />
        {/* custom page 프렌차이즈 pk와 메뉴 pk url에 넣어서 접근해야하는지?? */}
        <Route exact path="/custom" component={CustomPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/selectmenu" component={SelectMenuPage} />
        <Route exact path="/review/:reviewId" component={ReviewPage} />
        <Route exact path="/update-profile" component={UpdateProfilePage} />
        <Route exact path="/pay-success" component={PaySuccessPage}/>
        <Route exact path="/pay-fail" component={PayFailPage}/>
        <Route exact path="/daily-consumption-graph" component={DailyConsumptionGraph} />
      </Switch>
    </PageLayout>
  )

  // Intro 페이지는 Nav 없는곳으로 렌더링
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IntroContainer} />
        <Route exact path="/sign-in" component={IntroContainer} />
        <Route exact path="/sign-up" component={IntroContainer} />
        <Route exact path="/image-signup" component={IntroContainer} />
        <Route exact path="/info" component={IntroContainer} />
        <Route exact path="/cafe-ceo-order" component={IntroContainer} />
        <Route exact path="/search-id" component={SearchIdPage} />
        <Route exact path="/search-pw" component={SearchPwPage} />
        <Route exact path="/error404" component={IntroContainer} />
        <Route exact path="/error500" component={IntroContainer} />
        <Route exact path="/loading" component={IntroContainer} />

        <Route component={DefaultContainer} />
        <Route exact path="/drink-add" component={DefaultContainer} />
        <Route exact path="/custom" component={DefaultContainer} />
        <Route exact path="/selectmenu" component={DefaultContainer} />
        <Route exact path="/review" component={DefaultContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
