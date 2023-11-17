import { FC, useEffect, useState } from 'react';
import { TabsProps, Tabs, Row, Col, Space, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import Soucelist from './Soucelist';
import Loglist from './Loglist';

// import { userCollectorInfo } from './hooks';
interface SProps {
  sn: string | null;
  id: string | null;
  onBack: () => void;
}
export enum TabsEnum {
  souce = '1',
  log = '2',
}

const Index: FC<SProps> = ({ sn, onBack, id }) => {
  const [tab, setTap] = useState<string>(TabsEnum.souce);
  // const { trigger, data } = userCollectorInfo();
  // console.log('data', data);

  // const isMpm = data?.data?.model?.modelName === 'mpm';

  const handeChange = (t: string) => {
    setTap(t);
  };

  const items: TabsProps['items'] | any = [
    {
      key: '1',
      label: `模组信息`,
      children: <Soucelist sn={sn} tab={tab} />,
      // show: true,
    },
    {
      key: '2',
      label: `日志信息`,
      children: <Loglist id={id} sn={sn} tab={tab} />,
      // show: isMpm,
    },
  ];

  useEffect(() => {
    if (id) {
      // trigger({ id });
    }
  }, [id]);
  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <span>模组SN</span>
            <h4>{sn}</h4>
          </Space>
        </Col>
        <Col>
          <Button icon={<RollbackOutlined />} type="primary" onClick={onBack}>
            返回
          </Button>
        </Col>
      </Row>
      <></>
      <Tabs defaultActiveKey={TabsEnum.souce} items={items} onChange={handeChange} activeKey={tab} />
    </>
  );
};
export default Index;
