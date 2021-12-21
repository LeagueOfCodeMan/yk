import React, { useState } from 'react';
import {
  APILoader,
  Map,
  MapTypeControl,
  PanoramaControl,
} from '@uiw/react-baidu-map';
import styles from './index.less';

const defaultSettings = {
  autoLocalCity: true,
  enableDragging: true, // 是否开启地图可拖拽缩放
  enableScrollWheelZoom: true, //是否开启鼠标滚轮缩放
  zoom: 14, // 缩放级别
  center: {
    lng: 120.034116,
    lat: 28.875991,
  },
};

const JiangNan: React.FC<any> = () => {
  const handleClick = (event: any) => {
    console.log(event);
  };
  // @ts-ignore
  return (
    <>
      <Map
        {...(defaultSettings as any)}
        mapType={BMAP_SATELLITE_MAP}
        currentCity={'永康市'}
        onClick={handleClick}
      >
        <MapTypeControl
          offset={new BMap.Size(40, 40)}
          anchor={BMAP_ANCHOR_TOP_LEFT}
        />
      </Map>
    </>
  );
};

export default JiangNan;
