import * as React from "react";

import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import styled from "styled-components";

function PageLayout(props) {
  const Main = styled.main(() => ({
    backgroundColor: "#F9F6F2",
    width: '95%',
    marginTop: 15,
    marginBottom: 60,
    marginLeft: 'auto',
    marginRight:'auto',
  }))

  return (
    <div>
      <TopBar />
      <Main style={{ marginTop: 15, marginBotton: 20 }}>
        {props.children}
      </Main>
      <BottomNav />
    </div>
  );
}

export default PageLayout;