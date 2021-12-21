import React from 'react';
import { Label, Map, MapTypeControl, Marker, ZoomControl } from 'react-bmapgl';
import styles from './index.less';

const defaultSettings = {
  enableDragging: true, // 是否开启地图可拖拽缩放
  enableScrollWheelZoom: true, //是否开启鼠标滚轮缩放
  tilt: 0, // 地图倾斜角度
  zoom: 12, // 缩放级别
  mapType: 'earth', // 地图类型 earth / normal
  style: {
    width: '100%',
    height: '100%',
  },
};

const JiangNan: React.FC<any> = () => {
  const handleClick = (event: any) => {
    console.log(event);
  };
  // @ts-ignore
  return (
    <Map
      className={styles.map}
      center={new BMapGL.Point(116.404449, 39.914889)}
      {...defaultSettings}
      onClick={handleClick}
    >
      <Label
        position={new BMapGL.Point(116.4, 39.91)}
        text="欢迎使用百度地图GL版"
      />
      <Label
        position={new BMapGL.Point(222.4, 333.91)}
        text="欢迎使用百度地图GL版2"
      />
      <Marker
        position={new BMapGL.Point(116.404449, 39.914889)}
        enableDragging
      />
      <Marker
        position={new BMapGL.Point(1116.404449, 39.914889)}
        enableDragging
      />
      <MapTypeControl />
      <ZoomControl />
    </Map>
  );
};

export default JiangNan;
