import React, { useState } from 'react';
import ContentCenter from '@/pages/component/ContentCenter';
import HeaderSearch from '@/pages/component/HeaderSearch';
import styles from './index.less';
import { optionSelect } from '@/pages/mock/constants';

export default () => {
  const [value, setValue] = useState<string>(optionSelect?.[0]?.value);
  const handleTypeChange = (val: string) => {
    console.log(val, 'change');
    setValue(val);
  };
  const handleTypeSearch = (val: string) => {
    console.log(val, 'search');
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <HeaderSearch
          value={value}
          handleChange={handleTypeChange}
          handleSearch={handleTypeSearch}
          options={optionSelect}
        />
      </div>
      <div className={styles.content}>
        <ContentCenter value={value} />
      </div>
    </div>
  );
};
