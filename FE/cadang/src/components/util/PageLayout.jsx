import * as React from "react";

import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import styled from "styled-components";

function PageLayout(props) {
  const MainLayout = styled.div(() => ({
    backgroundColor: "#F9F6F2",
    width: '95%',
    marginTop: 15,
    marginBottom: 60,
    marginLeft: 'auto',
    marginRight:'auto',
  }))

  return (
    <div >
      <TopBar/>
      <MainLayout style={{ marginTop: 15, marginBotton: 20 }}>
        {props.children}
      </MainLayout>
      <BottomNav />
    </div>
  );
}

export default PageLayout;