import { useMemo, useState } from "react";
import styled from "styled-components";
import { SearchIcon } from "components/atom/SearchIcon";
import { useProductListStore } from "store/ProductListStore";

export const SearchInputHandler = () => {
  const [keyword, setKeyword] = useState("");

  const { isSearch, productList, addSearchKeyword, toggleIsSearch } =
    useProductListStore((state) => ({
      isSearch: state.isSearch,
      toggleIsSearch: state.toggleIsSearch,
      productList: state.productList,
      addSearchKeyword: state.addSearchKeyword,
    }));

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const autoCompleteItems = useMemo(() => {
    const list = new Set<string>();
    if (!keyword) return [];
    productList.forEach(({ brandName, goodsName }) => {
      if (brandName.includes(keyword)) {
        list.add(brandName);
      }
      if (goodsName.includes(keyword)) {
        list.add(goodsName);
      }
    });
    return Array.from(list);
  }, [productList, keyword]);

  const onSelectItem = (item: string) => {
    addSearchKeyword(item);
    toggleIsSearch();
  };

  if (!isSearch) return null;

  return (
    <SearchContainer>
      <InpuContainer>
        <SearchIcon width={22} height={22} />
        <StyledInput
          type="text"
          placeholder="상품명 검색"
          onChange={onChangeHandler}
        />
        {autoCompleteItems.length > 0 && (
          <AutoCompleteContainer>
            {autoCompleteItems.map((item) => (
              <AutoCompleteItem key={item} onClick={() => onSelectItem(item)}>
                {item}
              </AutoCompleteItem>
            ))}
          </AutoCompleteContainer>
        )}
      </InpuContainer>
    </SearchContainer>
  );
};

const AutoCompleteContainer = styled.div`
  position: absolute;
  top: calc(100% - 15px);
  left: 15px;
  width: calc(100% - 30px);
  background: #ffffff;

  box-sizing: border-box;
  z-index: 300;
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
  z-index: 300;
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
  position: relative;
`;
