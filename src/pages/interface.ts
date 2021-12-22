import { CSSProperties } from 'react';

export interface OptionItem {
  title: string;
  label: string;
  value: number;
  style: CSSProperties;
  children?: {
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
  }[];
}
