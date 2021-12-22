import { CSSProperties } from 'react';

export interface OptionChildItem {
  type: number;
  serialNumber: number;
  lng: number;
  lat: number;
  showList: {
    /**
     * filed 表头
     * value 表格数据
     * search 搜索显示 1 填充值 2 后续跟随值 一般对应 企业 地址
     */
    filed: string;
    value: string | number;
    search: number;
  }[];
  searchKey?: string; // 搜索匹配字符串
  search?: string; // 搜索值
}

export type OptionChild = Partial<OptionChildItem>;

export interface OptionItem {
  title: string;
  label: string;
  value: number;
  style: CSSProperties;
  children?: OptionChild[];
}
