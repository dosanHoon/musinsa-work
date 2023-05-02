import { useMemo } from "react";
import styled from "styled-components";

export interface ProductType {
  goodsNo: number;
  goodsName: string;
  price: number;
  brandName: string;
  imageUrl: string;
  linkUrl: string;
  brandLinkUrl: string;
  normalPrice: number;
  isSale: boolean;
  saleRate: number;
  isSoldOut: boolean;
  isExclusive: boolean;
}

interface Props {
  product: ProductType;
}

function roundToOne(num: number) {
  return Math.round(num / 10) * 10;
}

function applyDiscount(price: number, discountRate: number) {
  const discountedPrice = price * (1 - discountRate / 100);
  return roundToOne(discountedPrice);
}

export const ProductCard = ({ product }: Props) => {
  const {
    goodsName,
    imageUrl,
    price,
    brandName,
    isExclusive,
    isSoldOut,
    isSale,
    saleRate,
  } = product;

  const salePrice = useMemo(
    () => applyDiscount(price, saleRate).toLocaleString("ko-KR"),
    [saleRate, price]
  );
  return (
    <ProductContainer>
      <ProductImage>
        {isSoldOut && <SoldoutDim>SOLD OUT</SoldoutDim>}
        <img src={imageUrl} alt={goodsName} />
      </ProductImage>
      <ProductInfo>
        {isExclusive && <LabelBox>단독</LabelBox>}
        <ProductTitle>
          <BranName>{brandName}</BranName>
          <ProducName>{goodsName}</ProducName>
        </ProductTitle>
        <ProductPriceContainer>
          <ProductPrice>{price.toLocaleString("ko-KR")}원</ProductPrice>
          {isSale && (
            <div>
              <RedBoldText>{saleRate}%</RedBoldText>
            </div>
          )}
        </ProductPriceContainer>
        {isSale && (
          <SalePrice>
            <span>{salePrice}원</span>
          </SalePrice>
        )}
      </ProductInfo>
    </ProductContainer>
  );
};
const SoldoutDim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LabelBox = styled.div`
  position: absolute;
  top: -13px;
  left: 10px;
  width: 33px;
  height: 26px;
  background: #18a286;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ellipsis = `
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  `;

const BranName = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  ${ellipsis}
`;

const ProducName = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  ${ellipsis}
`;

const ProductContainer = styled.div`
  position: relative;
  display: flex;
  flex-basis: 50%;
  padding: 8px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 187px;
  height: 366px;
  background: #ffffff;
`;

const ProductImage = styled.div`
  position: relative;
  width: 188px;
  height: 226px;
  flex: none;
  order: 0;
  flex-grow: 0;
  & > img {
    width: 100%;
  }
`;

const ProductInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  box-sizing: border-box;
  width: 100%;
`;

const ProductTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
`;

const ProductPrice = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;

const ProductPriceContainer = styled.div`
  margin-top: 4px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 100%;
`;

const RedBoldText = styled.span`
  font-weight: 700;
  color: #ff0000;
`;

const SalePrice = styled.p`
  ont-weight: 500;
  font-size: 11px;
  line-height: 12px;
  text-decoration-line: line-through;
  color: #aaaaaa;
  text-align: left;
  width: 100%;
`;
