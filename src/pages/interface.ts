import { CSSProperties } from 'react';

export interface OptionChildItem {
  type: number;
  serialNumber: number;
  companyName: string;
  registerAddress: string;
  legalPerson: string;
  companyLeader: string;
  qualityLeader: string;
  tel: string;
  area: string;
  lng: number;
  lat: number;
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
