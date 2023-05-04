import styled from "styled-components";
import { ProductCard } from "./Product";
import InfiniteScroll from "../InfiniteScroll";
import { TOTALPAGE, useProductListStore } from "store/ProductListStore";
import { useCallback, useMemo, useState } from "react";
import emptyIcon from "assets/icon-general-empty.png";

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(0);
  const {
    sourceList,
    getProductList,
    fetchData,
    selectedFilters,
    isSearch,
    searchKeyword,
  } = useProductListStore((state) => ({
    sourceList: state.productList,
    getProductList: state.filterdProductList,
    fetchData: state.fetchData,
    selectedFilters: state.selectedFilters,
    isSearch: state.isSearch,
    searchKeyword: state.searchKeyword,
  }));

  const morePage = useMemo(() => TOTALPAGE > page + 1, [page]);

  const callFetchData = useCallback(async () => {
    if (morePage) {
      await fetchData(page + 1);
      setPage(page + 1);
    }
  }, [fetchData, morePage, page]);

  const marginTop = useMemo(() => {
    let margin = 115;
    if (selectedFilters.size || searchKeyword.size) {
      margin += 58;
    }
    if (isSearch) {
      margin += 80;
    }
    return margin;
  }, [selectedFilters, isSearch, searchKeyword]);

  const productList = useMemo(() => {
    return getProductList(sourceList, selectedFilters, searchKeyword);
  }, [getProductList, sourceList, selectedFilters, searchKeyword]);

  const hasList = useMemo(() => productList.length !== 0, [productList]);

  return (
    <InfiniteScroll fetchData={callFetchData}>
      <>
        <ProductListContainer marginTop={marginTop}>
          {productList.map((product, i) => (
            <ProductCard product={product} key={product.goodsNo + i} />
          ))}
        </ProductListContainer>
        {page !== 0 && !hasList && (
          <EmptyContainer marginTop={marginTop}>
            <img src={emptyIcon} alt="empty icon" />
            <p>상품이 없습니다.</p>
          </EmptyContainer>
        )}
      </>
    </InfiniteScroll>
  );
};

const EmptyContainer = styled.div<{ marginTop?: number }>`
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  flex-direction: column;
  & > p {
    font-size: 14px;
    margin-top: 15px;
  }
  top: ${({ marginTop }) => (marginTop ? ` -${marginTop}px;` : "-115px")};
`;

const ProductListContainer = styled.div<{ marginTop?: number }>`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin-top: ${({ marginTop }) => (marginTop ? ` ${marginTop}px;` : "115px")};
`;
