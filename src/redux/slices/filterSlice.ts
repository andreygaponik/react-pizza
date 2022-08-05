import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortType = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price';
};

interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  sort: SortType
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    }
  },
});

export const {
  changeCategory,
  setSort,
  setFilters,
  setSearch
} = filterSlice.actions;

export default filterSlice.reducer;