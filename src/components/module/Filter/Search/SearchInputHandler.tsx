import styled from "styled-components";
import { SearchIcon } from "components/atom/SearchIcon";
import { useProductListStore } from "store/ProductListStore";

export const SearchInputHandler = () => {
  const store = useProductListStore((state) => ({
    isSearch: state.isSearch,
  }));

  if (!store.isSearch) return null;

  return (
    <SearchContainer>
      <InpuContainer>
        <SearchIcon width={22} height={22} />
        <StyledInput type="text" placeholder="상품명 검색" />
        <AutoCompleteContainer>
          <AutoCompleteItem>검색어1</AutoCompleteItem>
          <AutoCompleteItem>검색어2</AutoCompleteItem>
          <AutoCompleteItem>검색어3</AutoCompleteItem>
        </AutoCompleteContainer>
      </InpuContainer>
    </SearchContainer>
  );
};

const AutoCompleteContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-top: none;
  box-sizing: border-box;
  z-index: 100;
`;

const AutoCompleteItem = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  line-height: 21px;
  color: #333333;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

const InpuContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cccccc;
  padding: 8px 10px;
  background: #ffffff;
`;

const StyledInput = styled.input`
  border: none;
  background: #f9f9f9;
  font-weight: 400;
  font-size: 16px;
  flex: item;
  background: #ffffff;
  width: 100%;
`;

const SearchContainer = styled.div`
  background: #f9f9f9;
  padding: 20px 15px;
`;
