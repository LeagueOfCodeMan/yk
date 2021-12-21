import { optionSelect } from '@/pages/mock/constants';

export const handleMarkerData = () => {
  return optionSelect?.reduce((acc, prev) => {
    const children = (prev?.children || [])?.map((child) => ({
      ...child,
      pid: prev?.value,
    })) as any;
    return acc.concat(children);
  }, []);
};
