import { create } from "zustand";

import data01 from "data/data01.json";
import data02 from "data/data02.json";
import data03 from "data/data03.json";
import data04 from "data/data04.json";

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

export const isSale = "isSale";
export const isExclusive = "isExclusive";
export const isSoldOut = "isSoldOut";

export const filterTypeName = {
  isSale: "세일상품",
  isExclusive: "단독상품",
  isSoldOut: "품절포함",
};

export type filterTagType = keyof typeof filterTypeName;

const data = [
  data01.data.list,
  data02.data.list,
  data03.data.list,
  data04.data.list,
];

type ProductListStore = {
  productList: ProductType[];
  addProduct: (list: any[]) => void;
  fetchData: (state: any) => Promise<void>;
  selectedFilters: Set<filterTagType>;
  toggleFilter: (filter: filterTagType) => void;
  filterdProductList: (
    productList: ProductType[],
    selectedFilters: Set<filterTagType>,
    searchKeyword: Set<string>
  ) => ProductType[];
  isSearch: boolean;
  toggleIsSearch: () => void;
  searchKeyword: Set<string>;
  addSearchKeyword: (keyword: string) => void;
  toggleSearchKeyword: (keyword: string) => void;
  clearFilter: () => void;
};

export const TOTALPAGE = data.length;

function toggleHandler<T>(source: Set<T>, keyword: T) {
  const newSet = new Set(source);
  if (newSet.has(keyword)) {
    newSet.delete(keyword);
  } else {
    newSet.add(keyword);
  }
  return newSet;
}

export const useProductListStore = create<ProductListStore>((set, get) => ({
  productList: [...data[0]],
  addProduct: (list) =>
    set((state) => ({ productList: [...state.productList, ...list] })),
  fetchData: (page) => {
    //SERVER API와 동일한 구조를 위해서 Promise와 setTimeout을 사용
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        set((state) => ({
          productList: [...state.productList, ...data[page]],
        }));
        console.log("fetchData done", page);
        resolve();
      }, 1000);
    });
  },
  selectedFilters: new Set(),
  toggleFilter: (filter: filterTagType) =>
    set(({ selectedFilters }) => ({
      selectedFilters: toggleHandler(selectedFilters, filter),
    })),
  //filterdProductList는 productList를 필터링한 결과를 반환
  filterdProductList: (productList, selectedFilters, searchKeyword) => {
    const hasIsExclusive = selectedFilters.has(isExclusive);
    const hasIsSale = selectedFilters.has(isSale);
    //선택된 필터가 없는 경우 품절 상품은 제외하고 모든 상품을 반환
    if (selectedFilters.size === 0 && searchKeyword.size === 0) {
      return productList.filter((product) => !product.isSoldOut);
    }
    //선택된 필터가 있는 경우 선택된 필터에 따라 필터링
    return productList.filter((product) => {
      let filtered = true;
      //품절 상품 필터가 선택된 경우 품절 상품을 포함
      if (selectedFilters.has(isSoldOut)) {
        filtered = true;
      } else if (product.isSoldOut) {
        return false;
      }
      //단독 상품, 세일 상품 필터가 선택된 경우 해당 상품을 포함 OR 조건으로 동작
      if (hasIsExclusive && hasIsSale) {
        filtered = product.isExclusive || product.isSale;
      } else if (hasIsSale) {
        filtered = product.isSale;
      } else if (hasIsExclusive) {
        filtered = product.isExclusive;
      }
      //검색어를 입력한 경우
      //상품명, 브랜드명에 검색어가 포함되어 있는 경우 필터링
      //AND 조건으로 동작
      if (searchKeyword.size > 0) {
        filtered =
          Array.from(searchKeyword).some((keyword) => {
            return (
              product.goodsName.includes(keyword) ||
              product.brandName.includes(keyword)
            );
          }) && filtered;
      }

      return filtered;
    });
  },
  isSearch: false,
  toggleIsSearch: () => set((state) => ({ isSearch: !state.isSearch })),
  searchKeyword: new Set<string>(),
  addSearchKeyword: (keyword: string) =>
    set((state) => {
      const searchKeyword = new Set(state.searchKeyword);
      searchKeyword.add(keyword);
      return { searchKeyword };
    }),
  toggleSearchKeyword: (keyword: string) =>
    set(({ searchKeyword }) => ({
      searchKeyword: toggleHandler(searchKeyword, keyword),
    })),
  clearFilter: () =>
    set(() => ({
      selectedFilters: new Set(),
      searchKeyword: new Set(),
      isSearch: false,
    })),
}));
