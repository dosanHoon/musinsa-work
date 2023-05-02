import styled from "styled-components";
import { ProductCard, ProductType } from "./Product";

interface Props {
  list: ProductType[];
}

export const ProductList: React.FC<Props> = ({ list }) => {
  return (
    <ProductListContainer>
      {list.map((product) => (
        <ProductCard product={product} key={product.goodsNo} />
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
