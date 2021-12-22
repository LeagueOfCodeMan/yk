import React, { useState } from 'react';
import ContentCenter from '@/pages/component/ContentCenter';
import HeaderSearch from '@/pages/component/HeaderSearch';
import styles from './index.less';
import { optionSelect } from '@/pages/mock/jiangnan';

export default () => {
  const [value, setValue] = useState<number>(optionSelect?.[0]?.value);
  const handleTypeChange = (val: number) => {
    setValue(val);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <HeaderSearch
          value={value}
          handleChange={handleTypeChange}
          options={optionSelect as any}
        />
      </div>
      <div className={styles.content}>
        <ContentCenter value={value} options={optionSelect as any} />
      </div>
    </div>
  );
};
