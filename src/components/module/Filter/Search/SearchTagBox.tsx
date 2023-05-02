import { FC } from "react";
import styled from "styled-components";
import IonClose from "assets/ico_close.png";
import IconRefresh from "assets/ico_refresh.png";

interface Props {
  list: string[];
}

export const SearchTagBox: FC<Props> = ({ list }) => {
  return (
    <Container>
      <SearchTagContainer>
        <SearchTag>
          <span>세일상품</span>
          <img src={IonClose} alt="IonClose" width={14} height={14} />
        </SearchTag>
        <SearchTag>
          <span>세일상품</span>
          <img src={IonClose} alt="IonClose" width={14} height={14} />
        </SearchTag>
      </SearchTagContainer>
      <img src={IconRefresh} alt="IonClose" width={22} height={22} />
    </Container>
  );
};

const SearchTag = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 15px;
  background: #0078ff;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  height: 26px;
  box-sizing: border-box;
`;

const Container = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
`;

const SearchTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
