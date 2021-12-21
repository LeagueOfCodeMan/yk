import React from 'react';
import JiangNan from '@/pages/component/store/JiangNan';
import { AK } from '@/pages/mock/constants';
import { APILoader } from '@uiw/react-baidu-map';

const ContentCenter: React.FC<any> = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <APILoader akay={AK}>
        <JiangNan />
      </APILoader>
    </div>
  );
};

export default ContentCenter;
