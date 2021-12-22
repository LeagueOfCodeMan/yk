import { AutoComplete, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { OptionChild } from '@/pages/interface';
import IconFont from '@/pages/component/IconFont';
import Highlighter from 'react-highlight-words';
import { useModel } from 'umi';
import { ZheJiangYongKangConfig } from '@/pages/mock/jiangnan';

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

const Search: React.FC = () => {
  // @ts-ignore
  const {
    changeSearch,
    changeTarget,
    children,
    search,
    changeCenter,
    changeVisibleStore,
  } = useModel('useMapModal');
  const renderItem = (i: OptionChild) => ({
    value: i?.showList?.filter((j) => Boolean(j?.search))?.[0]?.value || '',
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
        <Space style={{ fontSize: 12, marginRight: 10 }}>
          <IconFont
            type="icon-Company"
            style={{ marginRight: 5, fontSize: 14 }}
          />
          {i?.showList
            ?.filter((j) => j?.search > 0)
            ?.map((s: any, index: number) => {
              return (
                <span
                  key={i?.type + '-' + i?.serialNumber + '-' + index}
                  style={s?.search === 1 ? {} : { color: 'rgba(0,0,0,0.4)' }}
                >
                  <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[search]}
                    autoEscape
                    textToHighlight={s?.value ? s?.value?.toString() : ''}
                  />
                </span>
              );
            })}
        </Space>
      </div>
    ),
  });

  const data = children?.map((i) => ({
    ...i,
    searchKey: i?.showList?.map((s) => s?.value)?.join(' '),
  }));

  const handleSearch = debounce((value: string) => {
    // 补全时仅做过滤
    if (!value) {
      changeCenter(ZheJiangYongKangConfig.center);
    }
    changeSearch(value);
  }, 500);

  const handleSelect = (value: string, option: any) => {
    changeSearch(value);
    changeTarget(option?.tg);
    const k = option?.tg?.type + '-' + option?.tg?.serialNumber;
    changeVisibleStore(true, k);
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
      <Input prefix={<SearchOutlined />} placeholder="所选类目模糊搜索" />
    </AutoComplete>
  );
};

export default Search;
