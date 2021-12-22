import React, { useState } from 'react';
import ContentCenter from '@/pages/component/ContentCenter';
import Header from '@/pages/component/Header';
import styles from './index.less';
import { ZheJiangYongKangConfig } from '@/pages/mock/jiangnan';
import { OptionChild } from '@/pages/interface';

export default () => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <ContentCenter />
      </div>
    </div>
  );
};
