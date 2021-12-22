import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
import {
  optionSelect as options,
  ZheJiangYongKangConfig,
} from '@/pages/mock/jiangnan';
import Search from '@/pages/component/Header/Search';
import { useModel } from 'umi';

const { Option } = Select;

export interface HeaderSearchProps {}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  // @ts-ignore
  const { value, changeValue, changeCenter, changeSearch } =
    useModel('useMapModal');
  const tg = options?.filter((i) => i?.value === value)?.[0];

  return (
    <div className={styles.headerSearch} style={tg?.style || {}}>
      <div className={styles.selectLabel}>
        <Select
          style={{ width: 150 }}
          bordered={false}
          value={value}
          placeholder="请选择"
          onChange={changeValue}
        >
          {options?.map((i) => (
            <Option value={i?.value} key={i?.value}>
              {i?.label}
            </Option>
          ))}
        </Select>
      </div>
      <div
        className={styles.title}
        onClick={() => {
          changeSearch('');
          changeCenter(ZheJiangYongKangConfig.center);
        }}
      >
        {tg?.title}
      </div>
      <div className={styles.inputSearch}>
        <Search />
      </div>
    </div>
  );
};

export default HeaderSearch;
