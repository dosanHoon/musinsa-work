import styled from "styled-components";
import { ProductCard } from "./Product";
import InfiniteScroll from "../InfiniteScroll";
import { TOTALPAGE, useProductListStore } from "store/ProductListStore";
import { useMemo, useState } from "react";

export const ProductList: React.FC = () => {
  const [page, setPage] = useState(0);
  const { productList, fetchData, selectedFilters, isSearch } =
    useProductListStore((state) => ({
      productList: state.filterdProductList,
      fetchData: state.fetchData,
      selectedFilters: state.selectedFilters,
      isSearch: state.isSearch,
    }));

  const callFetchData = async () => {
    if (TOTALPAGE > page + 1) {
      await fetchData(page);
      setPage(page + 1);
    }
  };

  const marginTop = useMemo(() => {
    let margin = 0;
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
      <ProductListContainer marginTop={marginTop}>
        {productList().map((product, i) => (
          <ProductCard product={product} key={product.goodsNo + i} />
        ))}
      </ProductListContainer>
    </InfiniteScroll>
  );
};

const ProductListContainer = styled.div<{ marginTop?: number }>`
  display: flex;
  flex-wrap: wrap;
  padding-top: 115px;
  position: relative;
  ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop}px;` : "")}
`;
