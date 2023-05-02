import React from "react";
import styled from "styled-components";
import { SearchHandler } from "./Search/SearchHandler";
import { SearchIcon } from "components/atom/SearchIcon";
import { SearchTagBox } from "./Search/SearchTagBox";

export const TopFilterBox = () => {
  return (
    <Container>
      <FilterBtnContainer>
        <FilterBtn>
          <span>검색</span>
          <SearchIcon style={{ marginLeft: 3 }} />
        </FilterBtn>
        <FilterBtn>세일상품</FilterBtn>
        <FilterBtn>단독상품</FilterBtn>
        <FilterBtn>품절포함</FilterBtn>
      </FilterBtnContainer>
      <SearchHandler />
      <SearchTagBox list={["테스트", "테스트2"]} />
    </Container>
  );
};

const Container = styled.div`
  background: #ffffff;
`;

const FilterBtnContainer = styled.div`
  display: flex;
  padding: 10px 7px;
  box-sizing: border-box;
  gap: 5px;
  height: 55px;
`;

const FilterBtn = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 7px 15px;
  height: 35px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;
