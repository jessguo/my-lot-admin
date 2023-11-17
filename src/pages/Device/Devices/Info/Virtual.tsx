import { FC, useEffect, useState } from 'react';
import { Descriptions, Segmented, Card, TimePicker, Slider, Switch, Select, Space, Spin, message, Badge } from 'antd';
import useSWRMutation from 'swr/mutation';
// import { RedoOutlined } from '@ant-design/icons';
import Auth from '@/components/Auth';

import { timeZones, dayFormart, hourFormat } from '../config';

import API, { Api, Paylod } from '@/api/devcie';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import { userDeviceInfo } from './hooks';
import useMqtt from '@/hooks/useWS';
dayjs.extend(customParseFormat);
export const speedListMap = Object.freeze({
  MPUUS: ['10A', '15A', '20A'],
  MPUEU: ['10A', '15A', '20A'],
  MPEUS: ['10A', '15A', '30A'],
  MPEEU: ['5A', '10A', '15A'],
  MPUJP: ['10A', '15A', '20A'],
  MPEJP: ['10A', '15A', '30A'],
});

interface IProps {
  deviceInfo: any;
  onRefresh: () => void;
}
interface PayloadType {
  arg: Paylod;
}

const timerModeOptions = timeZones.map((t) => ({
  value: t,
  label: t >= 0 ? `UTC+${t}` : `UTC${t}`,
}));

const sendDataRequest = async (_: typeof Api, { arg }: PayloadType) => {
  const response = await API.sendCMD(arg);
  if (response.isSuccess) {
    message.success('下发指令成功');
  }
};

const Index: FC<IProps> = ({ deviceInfo }) => {
  const id = deviceInfo?.id;
  if (!id) return <></>;
  const [state, setState] = useState({
    smartCharge: false,
    acOutput: false,
    dcOutput: false,
    upsMode: false,
    maxACInput: '',
    backupSoc: '',
    timerMode: false,
    ecoReservedSoc: 0,
    startTime: dayjs(),
    endTime: dayjs(),
  });
  const { isMutating, trigger } = useSWRMutation(Api, sendDataRequest);
  const [speedOptions, setSpeedOptions] = useState(speedListMap.MPEEU);
  const { mqttConnect, isConnected, payload } = useMqtt();

  const handleSilderChanged = (value: number) => {
    setState((pre) => ({
      ...pre,
      ecoReservedSoc: value,
    }));
  };

  const handleSwtichChange = (value: any, cmd: string) => {
    const payload = {
      id,
      cmd,
      state: value ? '1' : '0',
    };
    trigger(payload);
  };

  const handleSegmentedChange = (value: any, cmd: string) => {
    const payload = {
      id,
      cmd,
      key: value,
      state: '',
    };
    trigger(payload);
  };

  const handleTimeChange = (time: Dayjs | null, _: string, timeType: string) => {
    setState((pre) => ({
      ...pre,
      [timeType]: time,
    }));
  };

  const sendTimemode = (checked: boolean) => {
    const keys = {
      timeSlice: [
        {
          startTime: dayjs(state.startTime).format(dayFormart),
          endTime: dayjs(state.endTime).format(dayFormart),
        },
      ],
      ecoReservedSoc: state.ecoReservedSoc,
    };
    const payload = {
      id,
      state: checked ? '1' : '0',
      keys,
      cmd: 'timerMode',
      timezone: deviceInfo?.timezone,
    };
    trigger(payload);
  };

  const setStateFromEmsSetting = (emsSetting: any) => {
    if (emsSetting) {
      const cmdMaxACKey = emsSetting?.maxChargeCurrent + 'A';
      const backupSoc = emsSetting?.upsAutoChargeSoc + '%';
      const timeSlices = emsSetting.timeSlices?.[0] || {};
      const { startHour, startMinute, endHour, endMinute } = timeSlices;
      setState((pre) => {
        return {
          ...pre,
          smartCharge: emsSetting.chargeEnable,
          acOutput: emsSetting.acOutputEnable,
          dcOutput: emsSetting.dcOutputEnable,
          upsMode: emsSetting.upsEnable,
          maxACInput: cmdMaxACKey,
          backupSoc: backupSoc,
          timerMode: emsSetting.timerMode,
          ecoReservedSoc: emsSetting.ecoReservedSoc,
          startTime: dayjs(`${startHour}:${startMinute}`, 'H:mm'),
          endTime: dayjs(`${endHour}:${endMinute}`, 'H:mm'),
        };
      });
    }
  };

  useEffect(() => {
    if (deviceInfo) {
      const deviceShadowEmsSetting = deviceInfo?.shadow?.shadow?.state?.emsSetting;
      if (deviceShadowEmsSetting) {
        setStateFromEmsSetting(deviceShadowEmsSetting);
      }
    }
    if (deviceInfo) {
      const info = deviceInfo;
      // debugger;
      const devType = info?.model?.collection || '';
      const region = info?.model?.region || '';
      const atr = String(devType + region);
      // 字符串转大写
      const atrUpper = atr.toUpperCase() || '';
      //@ts-ignore
      const options = speedListMap[atrUpper];
      //@ts-ignore
      if (options) {
        setSpeedOptions(options);
      }
    }
  
  }, [deviceInfo]);

  useEffect(() => {
    const deviceId  = deviceInfo?.id
    if (deviceId) {
      mqttConnect(deviceId);
    }

  }, [deviceInfo]);

  useEffect(() => {
    if (payload?.message?.setting?.emsSetting) {
      //@ts-ignore
      const { emsSetting } = payload?.message?.setting || {};
      setStateFromEmsSetting(emsSetting);
    }
  }, [payload?.message, payload?.message?.setting?.emsSetting]);

  const tilte = (
    <Space>
      <Badge status={isConnected ? 'success' : 'default'} />
      <span>调试开关</span>
    </Space>
  );
  return (
    <Spin spinning={isMutating}>
      <Auth auth="device:cmd:send">
        <Card type="inner" title={tilte} style={{ backdropFilter: 'blur(2px)', background: '#fcfcfc', minWidth: '400px' }}>
          <Descriptions column={1}>
            <Descriptions.Item label="充电">
              <Switch checked={state.smartCharge} onChange={(checked) => handleSwtichChange(checked, 'smartCharge')} />
            </Descriptions.Item>
            <Descriptions.Item label="AC Output">
              <Switch checked={state.acOutput} onChange={(checked) => handleSwtichChange(checked, 'acOutput')} />
            </Descriptions.Item>
            <Descriptions.Item label="DC Output">
              <Switch checked={state.dcOutput} onChange={(checked) => handleSwtichChange(checked, 'dcOutput')} />
            </Descriptions.Item>
            <Descriptions.Item label="UPS Mode">
              <Switch checked={state.upsMode} onChange={(checked) => handleSwtichChange(checked, 'upsMode')} />
            </Descriptions.Item>

            <Descriptions.Item label="Max AC">
              <Segmented value={state.maxACInput} options={speedOptions} onChange={(v) => handleSegmentedChange(v, 'maxACInput')} />
            </Descriptions.Item>
            <Descriptions.Item label="Backup Soc">
              <Segmented value={state.backupSoc} options={['95%', '90%', '85%']} onChange={(v) => handleSegmentedChange(v, 'backupSoc')} />
            </Descriptions.Item>

            <Descriptions.Item label="Time Mode">
              <Switch checked={state.timerMode} onChange={sendTimemode} />
            </Descriptions.Item>
            <Descriptions.Item label="Timezone">
              <Select disabled={true} value={deviceInfo?.timezone} style={{ width: '50%' }} options={timerModeOptions} />
            </Descriptions.Item>
            <Descriptions.Item label="EcoReservedSoc">
              <Slider value={state.ecoReservedSoc} onAfterChange={handleSilderChanged} style={{ width: '100%' }} />
            </Descriptions.Item>
            <Descriptions.Item label="Time Mode">
              <Space>
                <TimePicker value={state.startTime} format={hourFormat} onChange={(time: Dayjs | null, timeString: string) => handleTimeChange(time, timeString, 'startTime')} />
                <TimePicker value={state.endTime} format={hourFormat} onChange={(time: Dayjs | null, timeString: string) => handleTimeChange(time, timeString, 'endTime')} />
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Auth>
    </Spin>
  );
};
export default Index;
