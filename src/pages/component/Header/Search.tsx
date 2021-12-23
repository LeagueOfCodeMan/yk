import { AutoComplete, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { OptionChild } from '@/pages/interface';
import IconFont from '@/pages/component/IconFont';
import Highlighter from 'react-highlight-words';
import { useModel } from 'umi';

const Search: React.FC = () => {
  // @ts-ignore
  const {
    changeSearch,
    changeTarget,
    children,
    search,
    changeVisibleStore,
    changeOpen,
    open,
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

  const handleSelect = (value: string, option: any) => {
    changeTarget(option?.tg);
    const k = option?.tg?.type + '-' + option?.tg?.serialNumber;
    changeVisibleStore(true, k);
  };

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(search);
  }, [search]);

  const handleChange = (v: string) => {
    // 补全时仅做过滤
    setValue(v);
    changeSearch(v);
    changeOpen(true);
  };

  const onFocus = () => {
    changeOpen(true);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={600}
      allowClear
      value={value}
      open={open}
      style={{ width: 250 }}
      options={data?.map((d) => renderItem(d))}
      filterOption={(inputValue, option) =>
        (option?.key as string)
          ?.toUpperCase()
          ?.indexOf(inputValue?.toUpperCase()) !== -1
      }
      backfill
      onSelect={handleSelect}
      onChange={handleChange}
      onFocus={onFocus}
    >
      <Input prefix={<SearchOutlined />} placeholder="所选类目模糊搜索" />
    </AutoComplete>
  );
};

export default Search;
