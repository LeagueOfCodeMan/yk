import React, { useEffect, useRef, useState } from 'react';
import {
  Control,
  CustomOverlay,
  Map,
  NavigationControl,
  ScaleControl,
} from '@uiw/react-baidu-map';
import styles from './index.less';
import { Popover, Radio, Space, Modal, InputNumber, message } from 'antd';
import {
  optionSelect as options,
  optionSelect,
  ZheJiangYongKangConfig,
} from '@/pages/mock/jl';
import IconFont from '@/pages/component/IconFont';
import { useModel } from 'umi';

const { confirm } = Modal;
const defaultSettings = {
  enableDragging: true, // 是否开启地图可拖拽缩放
  enableScrollWheelZoom: true, //是否开启鼠标滚轮缩放
  currentCity: ZheJiangYongKangConfig.currentCity,
};

interface MapContainerProps {}

/**
 * type类型 BMAP_SATELLITE_MAP BMAP_NORMAL_MAP BMAP_HYBRID_MAP 暂不支持三维
 */

const MapContainer: React.FC<MapContainerProps> = () => {
  const map = useRef<any>(null);
  const optionsWithMapType = [
    { label: '卫星', value: 1 },
    { label: '地图', value: 2 },
    { label: '混合', value: 3 },
  ];
  const [type, setType] = useState<number>(1);
  // mapType为对象，因此必须来用type作为button group 的key
  const [mapType, setMapType] = useState<any>(BMAP_SATELLITE_MAP);
  // @ts-ignore
  const {
    children2,
    value,
    center,
    changeVisibleStore,
    visibleStore,
    changeOpen,
  } = useModel('useMapModal');

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

  const handleMapClick = (i: any) => {
    changeOpen(false);
  };
  /**
   * 临时录入数据使用
   */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState<any>();
  const [vv, setVV] = useState<number>(1);
  const handleOk = async () => {
    fetch(
      '/api/mark?type=' +
        value +
        '&serialNumber=' +
        vv +
        '&lng=' +
        item?.point?.lng +
        '&lat=' +
        item?.point?.lat,
    )
      .then((data) => data.text())
      .then((res) => {
        message.info(res);
      });
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onRightClick = (i: any) => {
    setItem(i);
    setIsModalVisible(true);
  };
  const onChange = (v: number) => {
    setVV(v);
  };
  const onTouchStart = (label: any, item: any) => {
    const string = `${label ? '类目：' + label : ''}  ${
      ' 编号：' + item?.serialNumber
    }`;
    Modal.info({
      title: string,
      okText: '知道了',
      content: (
        <div>
          {item?.showList?.map(
            (
              s: {
                filed: string;
                value: string | number;
              },
              index: number,
            ) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flexStart',
                    alignItems: 'center',
                  }}
                  key={item?.type + '-' + item?.serialNumber + '-' + index}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>{s?.filed}：</span>
                  <span>{s?.value}</span>
                </div>
              );
            },
          )}
        </div>
      ),
    });
  };
  const isMobile = () => {
    let info = navigator.userAgent;
    let agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPod',
      'iPad',
    ];
    for (let i = 0; i < agents.length; i++) {
      if (info.indexOf(agents[i]) >= 0) return true;
    }
    return false;
  };
  const tg = options?.filter((i) => i?.value === value)?.[0];
  return (
    <>
      <Modal
        title={
          <span>
            当前经纬度：{'\r' + item?.point?.lng + '\r' + item?.point?.lat}
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div>当前类目：{tg?.label}</div>
          <div>
            序号：
            <InputNumber value={vv} onChange={onChange} />
          </div>
        </div>
      </Modal>
      <Map
        ref={map}
        className={styles.map}
        {...(defaultSettings as any)}
        mapType={mapType}
        center={center || ZheJiangYongKangConfig.center}
        onClick={handleMapClick}
        onRightClick={onRightClick}
        zoom={15}
        minZoom={10}
      >
        {children2?.map((i: any) => {
          const label =
            optionSelect?.filter((j) => j?.value === i?.type)?.[0]?.label || '';
          const key = i?.type + '-' + i?.serialNumber;
          return (
            <CustomOverlay
              key={i?.type + '-' + i?.serialNumber}
              paneName="floatPane"
              position={{ lng: i?.lng, lat: i?.lat }}
            >
              <div className={styles.tip}>
                {isMobile() ? (
                  <div
                    style={{ position: 'relative' }}
                    onTouchStart={() => {
                      onTouchStart(label, i);
                    }}
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
                ) : (
                  <Popover
                    visible={visibleStore[key]}
                    onVisibleChange={(vis) => changeVisibleStore(vis, key)}
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
                    <div style={{ position: 'relative' }}>
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
                )}
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
