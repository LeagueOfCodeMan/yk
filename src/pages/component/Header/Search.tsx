import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { OptionChild } from '@/pages/interface';
import IconFont from '@/pages/component/IconFont';
import Highlighter from 'react-highlight-words';
import { useModel } from 'umi';

function debounce(fn: Function, delay: number) {
  let timerId: any = null;
  return function () {
    // @ts-ignore
    const context = this;
    if (timerId) {
      window.clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(context, arguments);
      timerId = null;
    }, delay);
  };
}

const Search: React.FC<{}> = () => {
  // @ts-ignore
  const { changeSearch, changeTarget, children, search } =
    useModel('useMapModal');
  const renderItem = (i: OptionChild) => ({
    value: i?.companyName || '',
    key: i?.searchKey || '',
    tg: i,
    label: (
      <div
        key={i?.searchKey || ''}
        style={{
          display: 'flex',
          fontSize: 12,
        }}
      >
        <span style={{ fontSize: 12, marginRight: 10 }}>
          <IconFont
            type="icon-Company"
            style={{ marginRight: 5, fontSize: 14 }}
          />
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[search]}
            autoEscape
            textToHighlight={i?.companyName ? i?.companyName?.toString() : ''}
          />
        </span>
        <span style={{ color: 'rgba(0,0,0,0.4)' }}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[search]}
            autoEscape
            textToHighlight={
              i?.registerAddress ? i?.registerAddress?.toString() : ''
            }
          />
        </span>
      </div>
    ),
  });

  const data = children?.map((i) => ({
    ...i,
    searchKey: Object.values(i)?.join(' '),
  }));

  const handleSearch = debounce((value: string) => {
    // 补全时仅做过滤
    changeSearch(value);
  }, 500);

  const handleSelect = (value: string, option: any) => {
    changeSearch(value);
    changeTarget(option);
  };
  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={600}
      allowClear
      value={search}
      style={{ width: 250 }}
      options={data?.map((d) => renderItem(d))}
      filterOption={(inputValue, option) =>
        (option?.key as string)
          ?.toUpperCase()
          ?.indexOf(inputValue?.toUpperCase()) !== -1
      }
      backfill
      onSearch={handleSearch}
      onSelect={handleSelect}
    >
      <Input prefix={<SearchOutlined />} placeholder="全类目模糊搜索" />
    </AutoComplete>
  );
};

export default Search;
