import { FC, useCallback } from "react";
import { filterTagType, useProductListStore } from "store/ProductListStore";
import styled from "styled-components";

interface FilterBtnProps {
  children: React.ReactNode;
  keyword: filterTagType;
}

export const FilterBtn: FC<FilterBtnProps> = ({ children, keyword }) => {
  const { toggleFilter, selectedFilters } = useProductListStore((state) => ({
    selectedFilters: state.selectedFilters,
    toggleFilter: state.toggleFilter,
  }));

  const hasFilter = useCallback(
    (filter: filterTagType) => selectedFilters.has(filter),
    [selectedFilters]
  );

  const clickHandler = useCallback(() => {
    toggleFilter(keyword);
  }, [toggleFilter, keyword]);

  return (
    <Container isColor={hasFilter(keyword)} onClick={clickHandler}>
      {children}
    </Container>
  );
};

export const Container = styled.div<{
  isBackground?: boolean;
  isColor?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 7px 15px;
  height: 35px;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  background: ${(props) => (props.isBackground ? " #0078FF" : "#ffffff")};
  color: ${(props) => (props.isBackground ? "#ffffff" : "")};
  ${({ isColor }) => (isColor ? `color: #0078FF;` : "")}
  cursor: pointer;
`;
