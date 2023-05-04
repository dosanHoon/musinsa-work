import styled from "styled-components";
import { ProductCard } from "./Product";
import InfiniteScroll from "../InfiniteScroll";
import { TOTALPAGE, useProductListStore } from "store/ProductListStore";
import { useMemo, useState } from "react";
import emptyIcon from "assets/icon-general-empty.png";

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(-1);
  const { getProductList, fetchData, selectedFilters, isSearch } =
    useProductListStore((state) => ({
      getProductList: state.filterdProductList,
      fetchData: state.fetchData,
      selectedFilters: state.selectedFilters,
      isSearch: state.isSearch,
    }));

  const morePage = useMemo(() => {
    return TOTALPAGE > page + 1;
  }, [page]);

  const callFetchData = async () => {
    if (morePage) {
      await fetchData(page + 1);
      setPage(page + 1);
    }
  };

  const marginTop = useMemo(() => {
    let margin = 115;
    if (selectedFilters.size) {
      margin += 58;
    }
    if (isSearch) {
      margin += 80;
    }
    return margin;
  }, [selectedFilters, isSearch]);

  return (
    <InfiniteScroll fetchData={callFetchData}>
      <>
        <ProductListContainer marginTop={marginTop}>
          {getProductList().map((product, i) => (
            <ProductCard product={product} key={product.goodsNo + i} />
          ))}
        </ProductListContainer>
        {page !== -1 && getProductList().length === 0 && (
          <EmptyContainer>
            <img src={emptyIcon} alt="empty icon" />
            <p>상품이 없습니다.</p>
          </EmptyContainer>
        )}
      </>
    </InfiniteScroll>
  );
};

const EmptyContainer = styled.div`
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
`;

const ProductListContainer = styled.div<{ marginTop?: number }>`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: ${({ marginTop }) => (marginTop ? ` ${marginTop}px;` : "115px")};
`;
