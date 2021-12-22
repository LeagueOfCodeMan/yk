import { optionSelect, ZheJiangYongKangConfig } from '@/pages/mock/jiangnan';
import { useCallback, useEffect, useState } from 'react';
import { OptionChild } from '@/pages/interface';

export default function useMapModel() {
  /**
   * 搜索后select后的search 值
   */
  const [search, setSearch] = useState<string>('');
  const changeSearch = useCallback((v) => {
    setSearch(v);
  }, []);
  /**
   * 搜索后所选择的目标点
   */
  const [target, setTarget] = useState<OptionChild>();
  const changeTarget = useCallback((v) => {
    setCenter(
      v?.lng ? { lng: v?.lng, lat: v?.lat } : ZheJiangYongKangConfig.center,
    );
    setTarget(v);
  }, []);
  /**
   * Map中心点
   */
  const [center, setCenter] = useState<{ lng: number; lat: number }>(
    ZheJiangYongKangConfig.center,
  );
  const changeCenter = useCallback((v) => {
    setCenter(v);
  }, []);
  /**
   * 左侧类目所选
   */
  const [value, setValue] = useState<number>(0);
  const changeValue = useCallback((v) => {
    setValue(v);
  }, []);
  /**
   * 选择类目下所有点列表
   */
  const [children, setChildren] = useState<OptionChild[]>([]);
  useEffect(() => {
    setChildren(
      optionSelect?.filter((child) => child?.value === value)?.[0]?.children ||
        [],
    );
  }, [value]);
  /**
   * 选择类目下筛选后点列表
   */
  const [children2, setChildren2] = useState<OptionChild[]>([]);
  useEffect(() => {
    const filterTypeChildren =
      optionSelect?.filter((child) => child?.value === value)?.[0]?.children ||
      [];
    const filterSearchChildren =
      filterTypeChildren?.filter((d) =>
        Object.values(d)?.includes(search || ''),
      ) || [];
    setChildren2(filterSearchChildren);
  }, [value, search]);

  return {
    search,
    changeSearch,
    target,
    changeTarget,
    center,
    changeCenter,
    value,
    changeValue,
    children,
    children2,
  };
}
