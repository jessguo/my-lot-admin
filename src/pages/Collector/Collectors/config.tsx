import { TablePaginationConfig, Space, Skeleton } from 'antd';

export const selectOptions = [
  { value: '1', label: '在线' },
  { value: '2', label: '离线' },
  { value: '', label: '全部' },
];

export const initPagination: TablePaginationConfig = Object.freeze({ current: 1, pageSize: 10, total: 0, showSizeChanger: false });

export const LoadingSketch = () => (
  <>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Space>
  </>
);

export const timeZones = [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const hourFormat = 'HH:mm';
export const dayFormart = 'YYYY-MM/DD HH:mm:ss';
