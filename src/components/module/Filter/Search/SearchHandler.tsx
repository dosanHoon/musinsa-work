import styled from "styled-components";
import { SearchIcon } from "components/atom/SearchIcon";

export const SearchHandler = () => {
  return (
    <SearchContainer>
      <InpuContainer>
        <SearchIcon width={22} height={22} />
        <StyledInput type="text" placeholder="상품명 검색" />
      </InpuContainer>
    </SearchContainer>
  );
};

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
