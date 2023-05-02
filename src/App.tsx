import React from "react";
import logo from "./assets/logo_musinsa.png";
import styled from "styled-components";
import data01 from "./data/data01.json";
import data02 from "./data/data02.json";
import data03 from "./data/data03.json";
import data04 from "./data/data04.json";
import { ProductList, TopFilterBox } from "components";

function App() {
  const data = [
    data01.data.list,
    data02.data.list,
    data03.data.list,
    data04.data.list,
  ];
  const [page, setPage] = React.useState(0);
  const [list, setList] = React.useState(data[page]);

  const fetchData = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (data.length > page + 1) {
          setPage(page + 1);
          setList([...list, ...data[page + 1]]);
        }
        resolve();
      }, 2000);
    });
  };

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Logo src={logo} alt="musinsa logo" />
        </LogoContainer>
        <TopFilterBox />
      </Header>
      <ProductList list={list} fetchData={fetchData} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 100%
  background: #ffffff;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  position: relative;
  height: 50px;
`;

const Header = styled.header`
  position: fixed;
  z-index: 100;
  width: 100%;
  max-width: 375px;
  left: 50%;
  transform: translate(-50%, 0);
  top: 0px;
  background: #ffffff;
`;

const Logo = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default App;
