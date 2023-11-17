import React, { useEffect, useState } from 'react';
import { Descriptions, Space, Modal, Row, Col, message, DatePicker, DatePickerProps } from 'antd';
import { ExclamationCircleFilled, LinkOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthButton from '@/components/AuthButton';
import { Span, HeartIcon, Copyspan } from '@/components';
import API, { Api } from '@/api/admin';
import { LoadingSketch } from '../config';
import Virtual from './Virtual';
import VirtualM from './VirtualM';
import dayjs from 'dayjs';

const { confirm } = Modal;

interface IProps {
  id: string;
  tab: string;
  trigger: any;
  data: any;
  isMutating: any;
}

const Index: React.FC<IProps> = ({ id, tab, trigger, data, isMutating }) => {
  // const { trigger: setTime } = useUpdateDeviceEffective();
  const [date, setDate] = useState(null) as any;
  const info = data?.data || {};
  const isMpm = info?.model?.name === 'mpm';
  const navigate = useNavigate();

  const handleUnbind = async () => {
    const doUnbind = async () => {
      const data = await API.post(Api.DEVICE_UNBIND_DEVICE, { id });
      if (data.isSuccess) {
        message.success(data.message);
        trigger({ id });
      }
      return data;
    };

    confirm({
      title: '该操作将解绑用户',
      icon: <ExclamationCircleFilled />,
      content: '请谨慎操作',
      async onOk() {
        doUnbind();
      },
    });
  };

  const handleChangeTime = () => {
    const doTime = async () => {
      let timeStr = date ? dayjs(date).format('YYYY-MM-DDT') : null;
      const data = await API.post(Api.DEVICE_WARRANTY_EFFECTIVE, { warrantyEffectiveDate: timeStr, id });
      if (data.isSuccess) {
        message.success(data.message);
        trigger({ id });
      }
      return data;
    };
    confirm({
      title: date ? '更新激活时间' : '清除激活时间',
      icon: <ExclamationCircleFilled />,
      content: '请谨慎操作',
      async onOk() {
        doTime();
      },
    });
  };
  const handleNav = () => {
    navigate(`/collector/list?collectorSn=${info.collectorSn}&collectorId=${info?.collector?.id}`);
  };

  useEffect(() => {
    if (tab === '1') {
      trigger({ id });
    }
  }, [tab, id]); // views
  useEffect(() => {
    if (info?.warrantyEffectiveDate) {
      setDate(dayjs(info?.warrantyEffectiveDate));
    }
  }, [info]);

  const onOk = (timeDate: DatePickerProps['value']) => {
    setDate(timeDate);
  };
  if (isMutating) return <LoadingSketch />;

  const title = (
    <Space>
      <span>设备详情</span>
      <Copyspan text={info?.sn}></Copyspan>
    </Space>
  );

  const modalTitle = (
    <Space>
      <span>物联模组</span>
      {info.collectorSn && <LinkOutlined onClick={handleNav} />}
    </Space>
  );

  const renderVirtual = () => {
    if (isMpm) {
      return <VirtualM onRefresh={() => trigger({ id })} deviceInfo={data?.data} />;
    }
    return <Virtual onRefresh={() => trigger({ id })} deviceInfo={data?.data} />;
  };

  return (
    <Row gutter={60}>
      <Col span={14}>
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {/* 设备详情 */}
          <Descriptions title={title} layout="vertical" column={4} bordered={true}>
            <Descriptions.Item label="设备sn">
              <Copyspan text={info?.sn}></Copyspan>
            </Descriptions.Item>
            <Descriptions.Item label="设备名称">
              <Span>{info?.name}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="设备型号">
              <Span>{info?.model?.name}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="设备版本">
              <Span>{info?.model?.remark}</Span>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="设备 ID">
              <Copyspan text={info.id}></Copyspan>
            </Descriptions.Item>
            <Descriptions.Item label="硬件版本">
              <Span>{info?.hardwareVersion}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="备注信息">
              <Span>{info?.remark}</Span>
            </Descriptions.Item>
            <Descriptions.Item span={4} label="绑定用户">
              <Space size="large">
                <Span>{info?.username}</Span>
                <AuthButton auth="device:unbind-device:update" disabled={!info?.username} onClick={handleUnbind} type="primary">
                  解绑
                </AuthButton>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item span={4} label="激活时间">
              <Space size="large">
                <DatePicker value={date || null} onChange={onOk} placeholder="请选择时间" />
                <AuthButton auth="warranty-effective:update" onClick={handleChangeTime} type="primary">
                  更新
                </AuthButton>
              </Space>
            </Descriptions.Item>
          </Descriptions>
          {/*  固件信息 */}
          <Descriptions title="固件信息" layout="vertical" column={4} bordered={true}>
            <Descriptions.Item label="当前版本">
              <Span>{info?.firmwareVersion}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="目标版本">
              <Span>{info?.targetFirmwareVersion}</Span>
            </Descriptions.Item>
          </Descriptions>
          {/*  物联模组 */}
          <Descriptions title={modalTitle} layout="vertical" column={3} bordered={true}>
            <Descriptions.Item label="模组 SN">
              <Copyspan text={info?.collector?.sn}></Copyspan>
            </Descriptions.Item>
            <Descriptions.Item label="固件版本">
              <Span>{info?.collector?.firmwareVersion}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="模组型号">
              <Span>{info?.collector?.model}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="模组 ID">
              <Copyspan text={info?.collector?.id}></Copyspan>
            </Descriptions.Item>
            <Descriptions.Item label="在线状态">
              <HeartIcon style={{ color: info?.collector?.status === 1 ? 'hotpink' : '#ddd' }} />
            </Descriptions.Item>
            <Descriptions.Item label="备注信息">
              <Span>{info?.collector?.remark}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="上次活跃">
              <Span>{info?.collector?.lastActiveAt}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="上次在线">
              <Span>{info?.collector?.lastOnlineAt}</Span>
            </Descriptions.Item>
            <Descriptions.Item label="上次离线">
              <Span>{info?.collector?.lastOfflineAt}</Span>
            </Descriptions.Item>
          </Descriptions>
          {/*  电池信息 */}
          {info?.batteryList?.length ? (
            <Descriptions title={'电池信息'} layout="vertical" column={3} bordered={true}>
              {info.batteryList.map((item: any) => (
                <Descriptions.Item label="sn">
                  <Span>{item?.sn}</Span>
                </Descriptions.Item>
              ))}
            </Descriptions>
          ) : null}
        </Space>
      </Col>
      <Col span={10}>{renderVirtual()}</Col>
    </Row>
  );
};
export default Index;
