import { FC, ReactNode, useMemo } from "react";
import styled from "styled-components";
import IonClose from "assets/ico_close.png";
import IconRefresh from "assets/ico_refresh.png";
import { filterTypeName, useProductListStore } from "store/ProductListStore";

export const SearchTagBox: FC = () => {
  const {
    searchKeyword,
    toggleSearchKeyword,
    selectedFilters,
    toggleFilter,
    clearFilter,
  } = useProductListStore((state) => ({
    searchKeyword: state.searchKeyword,
    toggleSearchKeyword: state.toggleSearchKeyword,
    selectedFilters: state.selectedFilters,
    toggleFilter: state.toggleFilter,
    clearFilter: state.clearFilter,
  }));

  const renderSearchTag = useMemo(() => {
    const tags: ReactNode[] = [];
    selectedFilters.forEach((value) => {
      const keyword = value;
      tags.push(
        <SearchTag key={keyword} onClick={() => toggleFilter(keyword)}>
          <span>{filterTypeName[keyword]}</span>
          <img src={IonClose} alt="IonClose" width={14} height={14} />
        </SearchTag>
      );
    });

    return tags;
  }, [selectedFilters, toggleFilter]);

  if (selectedFilters.size === 0 && searchKeyword.size === 0) return <></>;

  return (
    <Container>
      <SearchTagContainer>
        {!!searchKeyword.size &&
          Array.from(searchKeyword).map((keyword) => (
            <SearchTag key={keyword}>
              <span>{keyword}</span>
              <img
                src={IonClose}
                alt="IonClose"
                width={14}
                height={14}
                onClick={() => toggleSearchKeyword(keyword)}
              />
            </SearchTag>
          ))}
        {renderSearchTag}
      </SearchTagContainer>
      <img
        src={IconRefresh}
        alt="IonClose"
        width={22}
        height={22}
        onClick={clearFilter}
      />
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
