import React from 'react';
import { Input, Select } from 'antd';
import styles from './index.less';
import { OptionItem } from '@/pages/interface';
const { Option } = Select;

export interface HeaderSearchProps {
  value: number;
  handleChange: (value: number) => void;
  options: OptionItem[];
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { value, handleChange, options } = props;
  const tg = options?.filter((i) => i?.value === value)?.[0];
  return (
    <div className={styles.headerSearch} style={tg?.style || {}}>
      <div className={styles.selectLabel}>
        <Select
          bordered={false}
          showSearch
          value={value}
          placeholder="请选择"
          defaultActiveFirstOption={false}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={handleChange}
          notFoundContent={null}
        >
          {options?.map((i) => (
            <Option value={i?.value} key={i?.value}>
              {i?.label}
            </Option>
          ))}
        </Select>
      </div>
      <div className={styles.title}>
        {options?.filter((i) => i?.value === value)?.[0]?.title}
      </div>
      <div className={styles.inputSearch}>
        <Input.Search
          style={{ width: 200 }}
          placeholder="输入搜索内容"
          enterButton
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
