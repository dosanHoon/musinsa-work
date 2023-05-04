import styled from "styled-components";
import { SearchInputHandler } from "./Search/SearchInputHandler";
import { SearchIcon } from "components/atom/SearchIcon";
import { SearchTagBox } from "./Search/SearchTagBox";
import { FilterBtn, Container as SearchFitlerBtn } from "./FilterBtn";
import {
  filterTypeName,
  isExclusive,
  isSale,
  isSoldOut,
  useProductListStore,
} from "store/ProductListStore";

export const TopFilterBox = () => {
  const { toggleIsSearch, searchKeyword, isSearch } = useProductListStore(
    (state) => ({
      toggleIsSearch: state.toggleIsSearch,
      searchKeyword: state.searchKeyword,
      isSearch: state.isSearch,
    })
  );

  return (
    <Container>
      <FilterBtnContainer>
        <SearchFitlerBtn
          isBackground={isSearch}
          isColor={searchKeyword.size > 0}
          onClick={toggleIsSearch}
        >
          <span>검색</span>
          <SearchIcon style={{ marginLeft: 3 }} />
        </SearchFitlerBtn>
        <FilterBtn keyword={isSale}>{filterTypeName.isSale}</FilterBtn>
        <FilterBtn keyword={isExclusive}>
          {filterTypeName.isExclusive}
        </FilterBtn>
        <FilterBtn keyword={isSoldOut}>{filterTypeName.isSoldOut}</FilterBtn>
      </FilterBtnContainer>
      <SearchInputHandler />
      <SearchTagBox />
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
