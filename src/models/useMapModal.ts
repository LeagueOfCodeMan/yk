import { optionSelect, ZheJiangYongKangConfig } from '@/pages/mock/jl';
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
  const [value, setValue] = useState<number>(1);
  const changeValue = useCallback((v) => {
    setValue(v);
  }, []);
  /**
   * 选择类目下所有点列表
   */
  const [children, setChildren] = useState<OptionChild[]>([]);
  useEffect(() => {
    const filterTypeChildren =
      optionSelect?.filter((child) => child?.value === value)?.[0]?.children ||
      [];
    setChildren(filterTypeChildren as OptionChild[]);
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
        d?.showList
          ?.map((s) => s?.value)
          ?.join('')
          ?.includes(search || ''),
      ) || [];
    setChildren2(filterSearchChildren as OptionChild[]);
  }, [value, search]);

  /**
   * popover visible控制
   */
  const [visibleStore, setVisibleStore] = useState<{ [key: string]: boolean }>(
    {},
  );
  const changeVisibleStore = useCallback((vis, k) => {
    setVisibleStore({ ...visibleStore, [k]: vis });
  }, []);

  /**
   * search focus 判断
   */
  const [open, setOpen] = useState<boolean>(false);
  const changeOpen = useCallback((v) => {
    setOpen(v);
  }, []);

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
    visibleStore,
    changeVisibleStore,
    setVisibleStore,
    open,
    changeOpen,
  };
}
