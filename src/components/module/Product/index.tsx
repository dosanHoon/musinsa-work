import styled from "styled-components";
import { ProductCard, ProductType } from "./Product";
import InfiniteScroll from "../InfiniteScroll";

interface Props {
  list: ProductType[];
  fetchData: () => Promise<void>;
}

export const ProductList: React.FC<Props> = ({ list, fetchData }) => {
  return (
    <InfiniteScroll fetchData={fetchData}>
      <ProductListContainer>
        {list.map((product) => (
          <ProductCard product={product} key={product.goodsNo} />
        ))}
      </ProductListContainer>
    </InfiniteScroll>
  );
};

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
