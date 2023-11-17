import React, { useState } from 'react';
import { Tabs, Button, Space } from 'antd';
import type { TabsProps } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import AuthButton from '@/components/AuthButton';
import { hasPermission } from '@/utils/index';

import { userDeviceInfo } from './hooks';
import Info from './Info';
import Source from './Source';
import Task from './Task';
import Update from './Update';
import Orders from './Orders';
import RawData from './RawData';
import Warngings from './Warngings';

interface IProps {
  info: any;
  onBack?: () => void;
}

const Index: React.FC<IProps> = ({ info, onBack }) => {
  console.log('info', info);
  const { id, sn } = info;
  const [open, setOpen] = useState(false);
  const [tab, setTap] = useState('1');

  const { data, trigger, isMutating } = userDeviceInfo();

  const items: TabsProps['items'] | any = [
    {
      key: '1',
      label: `设备信息`,
      auth: 'device:info:read',
      children: <Info id={id} tab={tab} trigger={trigger} isMutating={isMutating} data={data} />,
    },
    {
      key: '2',
      label: `解析数据`,
      auth: 'device:source-data-list:read',
      children: <Source sn={sn} tab={tab} />,
    },
    {
      key: '3',
      label: `设备任务`,
      auth: 'device:task-list:read',

      children: <Task id={id} tab={tab} />,
    },
    {
      key: '4',
      label: `数据明细`,
      auth: 'device:task-list:read',
      children: <Orders sn={sn} tab={tab} info={data} />,
    },
    {
      key: '5',
      label: `mpm透传`,
      auth: 'modbus-task-list:read',
      children: <RawData id={id} tab={tab} info={data} />,
      hide: info?.model?.name !== 'mpm',
    },
    {
      key: '6',
      label: '告警',
      auth: 'device:errorInfo-List:read',
      children: <Warngings id={id} sn={sn} tab={tab} />,
    },
  ]
    .filter((item) => hasPermission(item.auth))
    .filter((item) => !item.hide);

  const handleAfterUpdate = () => {
    setOpen(false);
    trigger({ id });
  };

  const operations = (
    <Space>
      <AuthButton auth="device:upgrade:create" type="primary" onClick={() => setOpen(true)}>
        固件升级
      </AuthButton>
      <Button icon={<RollbackOutlined />} type="primary" onClick={onBack}>
        返回
      </Button>
    </Space>
  );

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={(v) => setTap(v)} activeKey={tab} tabBarExtraContent={operations} />
      <Update sn={sn} open={open} onFinish={handleAfterUpdate} onCancel={() => setOpen(false)} />
    </>
  );
};

export default Index;
