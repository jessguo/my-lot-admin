import { create } from 'zustand';
import { initPagination } from '../config';
import { TablePaginationConfig } from 'antd';

interface Filters {
  startTime?: string | null;
  endTime?: string | null;
  cmd?: string | null;
}
type State = {
  info: any;
  pagination: TablePaginationConfig;
  filters: Filters;
};

type Actions = {
  setInfo: (info: any) => void;
  setFilters: (filters: Filters) => void;
  setPagination: (pagination: TablePaginationConfig) => void;
};

// const initialState: State = Object.freeze({});
const useCollector = create<State & Actions>((set) => ({
  info: {},
  pagination: initPagination,
  filters: {},
  setFilters: (newFilters: Filters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setInfo: (newInfo) => set(() => ({ info: newInfo })),
  setPagination: (newPagination: TablePaginationConfig) => set((state) => ({ pagination: { ...state.pagination, ...newPagination } })),
}));
export default useCollector;
