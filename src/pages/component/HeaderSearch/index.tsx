import React from 'react';
import { Input, Select } from 'antd';
import styles from './index.less';
const { Option } = Select;

export interface HeaderSearchProps {
  value: string;
  handleSearch: (value: string) => void;
  handleChange: (value: string) => void;
  options: { label: string; value: string; [propName: string]: any }[];
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { value, handleSearch, handleChange, options } = props;
  return (
    <div
      className={styles.headerSearch}
      style={options?.filter((i) => i?.value === value)?.[0]?.style || {}}
    >
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
          onSearch={handleSearch}
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
        {options?.filter((i) => i?.value === value)?.[0]?.label}
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
