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
export const search = "search";

export const FilterType = {
  isSale: "세일상품",
  isExclusive: "단독상품",
  isSoldOut: "품절포함",
};

export type filterTagType = "isSale" | "isExclusive" | "isSoldOut";

const data = [
  data01.data.list,
  data02.data.list,
  data03.data.list,
  data04.data.list,
];

type ProductListStore = {
  productList: ProductType[];
  isSearch: boolean;
  toggleIsSearch: () => void;
  addProduct: (list: any[]) => void;
  fetchData: (state: any) => Promise<void>;
  selectedFilters: Set<filterTagType>;
  toggleFilter: (filter: filterTagType) => void;
  searchKeyword: string[];
  removeSearchKeyword: (keyword: string) => void;
  filterdProductList: () => ProductType[];
  clearFilter: () => void;
};

export const TOTALPAGE = data.length;

export const useProductListStore = create<ProductListStore>((set, get) => ({
  productList: data[0],
  selectedFilters: new Set(),
  isSearch: false,
  searchKeyword: [],
  filterdProductList: () => {
    const { productList, selectedFilters } = get();
    const hasIsExclusive = selectedFilters.has(isExclusive);
    const hasIsSale = selectedFilters.has(isSale);
    if (selectedFilters.size === 0) {
      return productList.filter((product) => !product.isSoldOut);
    }
    return productList.filter((product) => {
      let filtered = false;
      if (selectedFilters.has(isSoldOut)) {
        filtered = true;
      } else if (product.isSoldOut) {
        return false;
      }

      if (hasIsExclusive && hasIsSale) {
        filtered = product.isExclusive || product.isSale;
      } else if (hasIsSale) {
        filtered = product.isSale;
      } else if (hasIsExclusive) {
        filtered = product.isExclusive;
      }

      //  || selectedFilters.has(isSale))
      //   filtered = product.isSale || product.isExclusive;
      // if (selectedFilters.has(search)) {
      // }
      return filtered;
    });
  },
  addProduct: (list) =>
    set((state) => ({ productList: [...state.productList, ...list] })),
  fetchData: (page) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        set((state) => ({
          productList: [...state.productList, ...data[page + 1]],
        }));

        resolve();
      }, 2000);
    });
  },
  toggleIsSearch: () =>
    set((state) => {
      return { isSearch: !state.isSearch };
    }),
  toggleFilter: (filter: filterTagType) =>
    set((state) => {
      const selectedFilters = new Set(state.selectedFilters);
      if (selectedFilters.has(filter)) {
        selectedFilters.delete(filter);
      } else {
        selectedFilters.add(filter);
      }
      return { selectedFilters };
    }),
  removeSearchKeyword: (keyword: string) =>
    set((state) => {
      const searchKeyword = [...state.searchKeyword];
      if (state.searchKeyword.includes(keyword)) {
        searchKeyword.splice(state.searchKeyword.indexOf(keyword), 1);
      }
      return { searchKeyword };
    }),
  clearFilter: () =>
    set((state) => ({ selectedFilters: new Set(), searchKeyword: [] })),
}));
