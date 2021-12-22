import React, { useEffect, useState } from 'react';
import {
  Control,
  CustomOverlay,
  Map,
  NavigationControl,
  ScaleControl,
} from '@uiw/react-baidu-map';
import styles from './index.less';
import { Popover, Radio, Space } from 'antd';
import { optionSelect, ZheJiangYongKangConfig } from '@/pages/mock/jiangnan';
import IconFont from '@/pages/component/IconFont';
import { useModel } from 'umi';
import { OptionChild } from '@/pages/interface';

const defaultSettings = {
  enableDragging: true, // 是否开启地图可拖拽缩放
  enableScrollWheelZoom: true, //是否开启鼠标滚轮缩放
  zoom: 15, // 缩放级别 - 500米 3 - 19
  currentCity: ZheJiangYongKangConfig.currentCity,
};

interface MapContainerProps {}

/**
 * type类型 BMAP_SATELLITE_MAP BMAP_NORMAL_MAP BMAP_HYBRID_MAP 暂不支持三维
 */

const MapContainer: React.FC<MapContainerProps> = () => {
  const optionsWithMapType = [
    { label: '卫星', value: 1 },
    { label: '地图', value: 2 },
    { label: '混合', value: 3 },
  ];
  const [type, setType] = useState<number>(1);
  // mapType为对象，因此必须来用type作为button group 的key
  const [mapType, setMapType] = useState<any>(BMAP_SATELLITE_MAP);
  // @ts-ignore
  const { children2, center, changeCenter, visible, changeVisible } =
    useModel('useMapModal');

  useEffect(() => {
    switch (type) {
      case 1:
        setMapType(BMAP_SATELLITE_MAP);
        break;
      case 2:
        setMapType(BMAP_NORMAL_MAP);
        break;
      default:
        setMapType(BMAP_HYBRID_MAP);
        break;
    }
  }, [type]);

  const handleClickToMoveCenter = (i: OptionChild) => {
    changeCenter(
      i?.lng ? { lng: i?.lng, lat: i?.lat } : ZheJiangYongKangConfig.center,
    );
  };

  return (
    <>
      <Map
        className={styles.map}
        {...(defaultSettings as any)}
        mapType={mapType}
        center={center || ZheJiangYongKangConfig.center}
      >
        {children2?.map((i: any) => {
          const label =
            optionSelect?.filter((j) => j?.value === i?.type)?.[0]?.label || '';
          return (
            <CustomOverlay
              key={i?.type + '-' + i?.serialNumber}
              paneName="floatPane"
              position={{ lng: i?.lng, lat: i?.lat }}
            >
              <div className={styles.tip}>
                <Popover
                  visible={visible}
                  onVisibleChange={(vis) => changeVisible(vis)}
                  placement="right"
                  title={
                    <Space>
                      <span>{label ? '类目：' + label : ''}</span>
                      <span>{label ? '编号：' + i?.serialNumber : ''}</span>
                    </Space>
                  }
                  content={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {i?.showList?.map(
                        (
                          s: {
                            filed: string;
                            value: string | number;
                          },
                          index: number,
                        ) => {
                          return (
                            <Space
                              key={
                                i?.type + '-' + i?.serialNumber + '-' + index
                              }
                            >
                              <span>{s?.filed}：</span>
                              <span>{s?.value}</span>
                            </Space>
                          );
                        },
                      )}
                    </div>
                  }
                  trigger="click"
                >
                  <div
                    style={{ position: 'relative' }}
                    onClick={() => handleClickToMoveCenter(i)}
                  >
                    <span
                      className={styles.num}
                      style={{
                        transform:
                          i?.serialNumber < 99
                            ? 'translate(-50%, -50%)'
                            : 'scale(0.68) translate(-72%, -80%)',
                      }}
                    >
                      {i?.serialNumber}
                    </span>
                    <IconFont
                      style={{ fontSize: 32 }}
                      type={`icon-dw-${i?.type || 1}`}
                    />
                  </div>
                </Popover>
              </div>
            </CustomOverlay>
          );
        })}
        <NavigationControl />
        <ScaleControl />
        <Control anchor={BMAP_ANCHOR_TOP_RIGHT}>
          <Radio.Group
            size="small"
            options={optionsWithMapType as any}
            onChange={(e) => setType(e.target.value)}
            value={type}
            optionType="button"
            buttonStyle="solid"
          />
        </Control>
      </Map>
    </>
  );
};

export default MapContainer;
