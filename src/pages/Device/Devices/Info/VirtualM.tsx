import { FC, useEffect, useState } from 'react';
import { Descriptions, Button, Card, DatePicker, TimePicker, Switch, Select, Space, Spin, message, Badge, InputNumber, Collapse, Segmented } from 'antd';
import useSWRMutation from 'swr/mutation';
import Auth from '@/components/Auth';
import { systemSettingList, applicationSettingList, gridConnectSettingList, chargeSettingList, dischargeSettingList } from '../config';
import API, { Api, Paylod } from '@/api/devcie';
import dayjs from 'dayjs';
import useWS from '@/hooks/useWS';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { produce } from 'immer';
import { findGaps } from './timeUtil.js';

const comStyles = {
  width: 150,
};

interface TimeRange {
  startTime: string;
  endTime: string;
}
interface ModalState {
  cmd: string | null;
  workMode: ModelEnum | null;
  maxBackFlow: number;
  eod: number;
  peekPeriod: TimeRange[] | any;
}
enum ModelEnum {
  selfPower = 'selfPower',
  timerMode = 'timerMode',
  backup = 'backup',
  custorm = 'custorm',
}
const modelMap = {
  MPM_WORK_MODE_TIME_BASED_CONTROL: ModelEnum.timerMode,
  MPM_WORK_MODE_SELF_POWERED: ModelEnum.selfPower,
  MPM_WORK_MODE_BACKUP_RESERVE: ModelEnum.backup,
  MPM_WORK_MODE_CUSTOM: ModelEnum.custorm,
};

const initPeekPeriod = Array(3).fill({
  startTime: '00:00',
  endTime: '00:00',
});
dayjs.extend(customParseFormat);

// 方法 接受一个value和scale根据scale大小对value10的平方倍大缩放
const scaleValue = (value: number, scale = 1) => {
  if (!scale) return value;
  return value / Math.pow(10, scale);
};

function padStart(num: number) {
  if (num === null || num === undefined) return '00';
  return `${num}`.padStart(2, '0');
}

enum ItemType {
  'number' = 'number',
  'select' = 'select',
  'toggle' = 'toggle',
  'time' = 'time',
  'date' = 'date',
}
interface Item {
  label: string;
  key: string;
  type: ItemType;
  value: any;
  range?: number[];
  placeholder?: string;
  options?: any[];
  scale?: number;
  newVal?: any;
}


interface IProps {
  deviceInfo: any;
  onRefresh: () => void;
}
interface PayloadType {
  arg: Paylod;
}
interface InputComfirmProps {
  item: Item;
  onOk: (val: number) => void;
}
const mapData = (raw: any, setData: any) => {
  const item = { ...raw };
  if (item.key in setData) {
    if (item.scale) {
      item.value = scaleValue(setData[item.key], item.scale);
    } else {
      item.value = setData[item.key];
    }
  } else {
    if (item.key === 'systemTime') {
      item.value = `${setData.timeYear + 2000}-${padStart(setData.timeMonth)}-${padStart(setData.timeDate)} ${padStart(setData.timeHour)}:${padStart(setData.timeMinute)}:${padStart(setData.timeSecond)}`;
    }
    if (item.key === 'acChargeStartTime1') {
      item.value = `${padStart(setData.acChargeStartHour1)}:${padStart(setData.acChargeStartMin1)}`;
    }
    if (item.key === 'acChargeEndTime1') {
      item.value = `${padStart(setData.acChargeEndHour1)}:${padStart(setData.acChargeEndMin1)}`;
    }
    if (item.key === 'acChargeStartTime2') {
      item.value = `${padStart(setData.acChargeStartHour2)}:${padStart(setData.acChargeStartMin2)}`;
    }
    if (item.key === 'acChargeEndTime2') {
      item.value = `${padStart(setData.acChargeEndHour2)}:${padStart(setData.acChargeEndMin2)}`;
    }
    if (item.key === 'acChargeStartTime3') {
      item.value = `${padStart(setData.acChargeStartHour3)}:${padStart(setData.acChargeStartMin3)}`;
    }
    if (item.key === 'acChargeEndTime3') {
      item.value = `${padStart(setData.acChargeEndHour3)}:${padStart(setData.acChargeEndMin3)}`;
    }
    if (item.key === 'chargeFirstStartTime1') {
      item.value = `${padStart(setData.chargeFirstStartHour1)}:${padStart(setData.chargeFirstStartMinute1)}`;
    }
    if (item.key === 'chargeFirstEndTime1') {
      item.value = `${padStart(setData.chargeFirstEndHour1)}:${padStart(setData.chargeFirstEndMinute1)}`;
    }
    if (item.key === 'chargeFirstStartTime2') {
      item.value = `${padStart(setData.chargeFirstStartHour2)}:${padStart(setData.chargeFirstStartMinute2)}`;
    }
    if (item.key === 'chargeFirstEndTime2') {
      item.value = `${padStart(setData.chargeFirstEndHour2)}:${padStart(setData.chargeFirstEndMinute2)}`;
    }
    if (item.key === 'chargeFirstStartTime3') {
      item.value = `${padStart(setData.chargeFirstStartHour3)}:${padStart(setData.chargeFirstStartMinute3)}`;
    }
    if (item.key === 'chargeFirstEndTime3') {
      item.value = `${padStart(setData.chargeFirstEndHour3)}:${padStart(setData.chargeFirstEndMinute3)}`;
    }
    if (item.key === 'forcedDischargeStartTime1') {
      item.value = `${padStart(setData.forcedDischargeStartHour1)}:${padStart(setData.forcedDischargeStartMin1)}`;
    }
    if (item.key === 'forcedDischargeEndTime1') {
      item.value = `${padStart(setData.forcedDischargeEndHour1)}:${padStart(setData.forcedDischargeEndMin1)}`;
    }
    if (item.key === 'forcedDischargeStartTime2') {
      item.value = `${padStart(setData.forcedDischargeStartHour2)}:${padStart(setData.forcedDischargeStartMin2)}`;
    }
    if (item.key === 'forcedDischargeEndTime2') {
      item.value = `${padStart(setData.forcedDischargeEndHour2)}:${padStart(setData.forcedDischargeEndMin2)}`;
    }
    if (item.key === 'forcedDischargeStartTime3') {
      item.value = `${padStart(setData.forcedDischargeStartHour3)}:${padStart(setData.forcedDischargeStartMin3)}`;
    }
    if (item.key === 'forcedDischargeEndTime3') {
      item.value = `${padStart(setData.forcedDischargeEndHour3)}:${padStart(setData.forcedDischargeEndMin3)}`;
    }
  }
  return item;
};
const sendDataRequest = async (_: typeof Api, { arg }: PayloadType) => {
  const response = await API.sendMPMCMD(arg);
  if (response.isSuccess) {
    message.success('下发指令成功');
  }
};

const InputComfirm = ({ item: _item, onOk }: InputComfirmProps) => {
  const [item] = useState(_item);
  const [newVal, setNewVal] = useState(_item.value);
  const { range } = item;

  const handleChange = (val: any) => {
    setNewVal(val);
  };
  const handleOk = () => {
    onOk(newVal);
  };
  useEffect(() => {
    setNewVal(_item.value);
  }, [_item.value]);

  // 当range 存在的时候判断 newVal 有没有超出range范围
  const isOverRange = range ? newVal < range[0] || newVal > range[1] : false;
  const isNull = newVal === null || newVal === undefined;

  const isDisabled = isNull || isOverRange;
  return (
    <Space.Compact style={{ width: '100%' }}>
      <InputNumber min={range?.[0] ?? null} max={range?.[1] ?? null} style={comStyles} onChange={handleChange} value={newVal} placeholder={item.placeholder} />
      <Button disabled={isDisabled} onClick={handleOk} type="primary" size="small">
        set
      </Button>
    </Space.Compact>
  );
};

const SelectPick = ({ onSelect, value, options }: { onSelect: (v: any) => void; value: any; options: any }) => {
  const [newVal, setNewVal] = useState(value);
  const handleChange = (val: any) => {
    setNewVal(val);
    onSelect(val);
  };
  useEffect(() => {
    setNewVal(value);
  }, [value]);
  return (
    <Space.Compact style={{ width: '100%' }}>
      <Select style={comStyles} onSelect={handleChange} value={newVal}>
        {options.map((item: any) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Space.Compact>
  );
};

const Index: FC<IProps> = ({ deviceInfo }) => {
  const id = deviceInfo?.id;
  if (!id) return <></>;
  const [systemSetting, setSystemSetting] = useState(systemSettingList);
  const [applicationSetting, setApplicationSetting] = useState(applicationSettingList);
  const [gridConnectSetting, setGridConnectSetting] = useState(gridConnectSettingList);
  const [chargeSetting, setChargeSetting] = useState(chargeSettingList);
  const [dischargeSetting, setDischargeSetting] = useState(dischargeSettingList);
  const { isMutating, trigger } = useSWRMutation(Api, sendDataRequest);

  const [mpmSetData, setMpmSetData] = useState({}) as any;

  const [modalState, setModalState] = useState<ModalState>({
    eod: 0,
    workMode: null,
    maxBackFlow: 0,
    cmd: null,
    peekPeriod: [...initPeekPeriod],
  });
  console.log('modalState', modalState);
  const { mqttConnect, isConnected, payload } = useWS();
  const handleValuechange = (item: Item, val: any, cmd: string) => {
    const keys = {
      [item.key]: val,
    };
    const payload = {
      id,
      cmd,
      [cmd]: keys,
      type: 'iot-admin',
    };
    trigger(payload as any);
  };
  const setDataInState = (item: Item, val: any, cmd: string) => {
    if (cmd === 'systemSetting') {
      setSystemSetting(
        produce((draft) => {
          const todo = draft.find((todo) => todo.key === item.key)!;
          if (todo) {
            todo.value = val;
          }
        }),
      );
    }
    if (cmd === 'applicationSetting') {
      setApplicationSetting(
        produce((pre) => {
          const todo = pre.find((todo) => todo.key === item.key)!;
          if (todo) {
            todo.value = val;
          }
        }),
      );
    }
    if (cmd === 'gridConnectSetting') {
      setGridConnectSetting(
        produce((pre) => {
          const todo = pre.find((todo) => todo.key === item.key)!;
          if (todo) {
            todo.value = val;
          }
        }),
      );
    }
    if (cmd === 'chargeSetting') {
      setChargeSetting(
        produce((pre) => {
          const todo = pre.find((todo) => todo.key === item.key)!;
          if (todo) {
            todo.value = val;
          }
        }),
      );
    }
    if (cmd === 'dischargeSetting') {
      setDischargeSetting(
        produce((pre) => {
          const todo = pre.find((todo) => todo.key === item.key)!;
          if (todo) {
            todo.value = val;
          }
        }),
      );
    }
  };
  const handleDatechange = (item: Item, val: any, cmd: string) => {
    const date = dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    setDataInState(item, date, cmd);
    handleValuechange(item, date, cmd);
  };
  const handleTimeChange = (item: Item, val: any, cmd: string) => {
    const date = dayjs(val).format('HH:mm');
    setDataInState(item, date, cmd);
    handleValuechange(item, date, cmd);
  };

  const handleToggleChange = (item: Item, checked: boolean, cmd: string) => {
    setDataInState(item, checked, cmd);
    handleValuechange(item, checked, cmd);
  };

  const handleInputChange = (item: Item, val: number, cmd: string) => {
    if (item.key === 'eod') {
      const socLowLimitForEpsDischg = dischargeSetting.find((item) => item.key == 'socLowLimitForEpsDischg')!;
      if (Number(socLowLimitForEpsDischg?.value) > val) {
        return message.error('在网设置必须高于离网设置');
      }
    }
    if (item.key === 'socLowLimitForEpsDischg') {
      const eod = dischargeSetting.find((item) => item.key == 'eod')!;
      if (Number(eod?.value) < val) {
        return message.error('离网设置必须小于等于在网设置');
      }
    }
    if (item.key === 'onGridEodVoltage') {
      const cutVoltForDischg10 = dischargeSetting.find((item) => item.key == 'cutVoltForDischg10')!;
      if (Number(cutVoltForDischg10?.value) > val) {
        return message.error('在网设置必须高于离网设置');
      }
    }
    if (item.key === 'cutVoltForDischg') {
      const onGridEodVoltage = dischargeSetting.find((item) => item.key == 'onGridEodVoltage')!;
      if (Number(onGridEodVoltage?.value) < val) {
        return message.error('离网设置必须小于等于在网设置');
      }
    }
    setDataInState(item, val, cmd);
    handleValuechange(item, val, cmd);
  };
  const setStates = (setData: any) => {
    setSystemSetting((produce) => [...produce.map((item) => mapData(item, setData))]);
    setApplicationSetting((produce) => [...produce.map((item) => mapData(item, setData))]);
    setGridConnectSetting((produce) => [...produce.map((item) => mapData(item, setData))]);
    setChargeSetting((produce) => [...produce.map((item) => mapData(item, setData))]);
    setDischargeSetting((produce) => [...produce.map((item) => mapData(item, setData))]);
  };

  const handleModalChange = (val: any, key: keyof ModalState) => {
    setModalState(
      produce((draft) => {
        draft[key] = val;
      }),
    );
  };
  const handleModalTimeChange = (str: string, index: number, key: string) => {
    setModalState(
      produce((pre) => {
        pre.peekPeriod[index] = {
          ...pre.peekPeriod[index],
          [key]: str,
        };
      }),
    );
  };
  const handeModalCMD = async () => {
    const { peekPeriod, workMode, maxBackFlow, eod } = modalState;
    const { socLowLimitForEpsDischg } = mpmSetData;
    // 过滤00:00
    const sendPeekPeriod = peekPeriod.filter((item: TimeRange) => !(item.startTime === '00:00' && item.endTime === '00:00'));
    const isOverLap = sendPeekPeriod.some((item: TimeRange) => item.startTime === item.endTime);
    if (isOverLap) {
      return message.error('开始时间不可等于结束时间');
    }
    if (Number(socLowLimitForEpsDischg) > eod) {
      return message.error('在网设置不可低于离网设置');
    }

    const offPeekPeriod = findGaps(sendPeekPeriod);
    const payload = {
      id: id,
      cmd: workMode,
      maxBackFlow: maxBackFlow,
      eod: eod,
      peekPeriod: sendPeekPeriod,
      offPeekPeriod,
    };
    const response = await API.sendMpmMode(payload);
    if (response.isSuccess) {
      message.success('设置已下发,预计执行时间20秒');
    }
  };

  const setSetState = (state: any = {}) => {
    const { setData, deviceAttribute } = state;
    if (!state || !setData || !deviceAttribute) return;
    const {
      eod,
      maxBackFlow,
      forcedDischargeStartHour1,
      forcedDischargeStartMin1,
      forcedDischargeEndHour1,
      forcedDischargeEndMin1,
      forcedDischargeStartHour2,
      forcedDischargeStartMin2,
      forcedDischargeEndHour2,
      forcedDischargeEndMin2,
      forcedDischargeStartHour3,
      forcedDischargeStartMin3,
      forcedDischargeEndHour3,
      forcedDischargeEndMin3,
    } = setData;
    const acChargeStartTime1 = `${padStart(forcedDischargeStartHour1)}:${padStart(forcedDischargeStartMin1)}`;
    const acChargeEndTime1 = `${padStart(forcedDischargeEndHour1)}:${padStart(forcedDischargeEndMin1)}`;

    const acChargeStartTime2 = `${padStart(forcedDischargeStartHour2)}:${padStart(forcedDischargeStartMin2)}`;
    const acChargeEndTime2 = `${padStart(forcedDischargeEndHour2)}:${padStart(forcedDischargeEndMin2)}`;

    const acChargeStartTime3 = `${padStart(forcedDischargeStartHour3)}:${padStart(forcedDischargeStartMin3)}`;
    const acChargeEndTime3 = `${padStart(forcedDischargeEndHour3)}:${padStart(forcedDischargeEndMin3)}`;

    const peekTimeSlice = [
      {
        startTime: acChargeStartTime1,
        endTime: acChargeEndTime1,
      },
      {
        startTime: acChargeStartTime2,
        endTime: acChargeEndTime2,
      },
      {
        startTime: acChargeStartTime3,
        endTime: acChargeEndTime3,
      },
    ];
    // @ts-ignore
    const workMode = modelMap[deviceAttribute?.workMode] || null;
    setModalState({
      ...modalState,
      workMode,
      eod,
      maxBackFlow,
      peekPeriod: peekTimeSlice,
    });
  };

  useEffect(() => {
    if (deviceInfo) {
      const info = deviceInfo;
      const setDatas = info?.shadow?.shadow?.state?.setData;
      setSetState(info?.shadow?.shadow?.state);
      setMpmSetData(info?.shadow?.shadow?.state?.setData);
      if (setDatas) {
        setStates(setDatas);
      }
    }
  }, [deviceInfo]);

  useEffect(() => {
    const deviceId  = deviceInfo?.id
    if (  deviceId ) {
      mqttConnect(deviceId);
    }

  }, []);


  useEffect(() => {
      if (payload.message.type === 'deviceSetting' || payload.message.type === 'deviceTask') {
        const setting = payload?.message?.setting || {};
        setStates(setting);
        setSetState(setting);
        setMpmSetData(payload.message?.setting);

        // setSetData(setting);
      }
  }, [payload?.message, payload?.message?.setting?.emsSetting]);

  const renderItem = (item: Item, setType: string) => {
    const value = item.value;
    if (item.type === 'toggle') {
      return (
        <Descriptions.Item label={item.label} key={item.key}>
          <Switch checked={value} onChange={(checked) => handleToggleChange(item, checked, setType)} />
        </Descriptions.Item>
      );
    }
    if (item.type === 'number') {
      if (item.key === 'maxBackFlow') {
        const feedInGridEn = applicationSetting.find((v) => v.key === 'feedInGridEn')!;
        if (!feedInGridEn.value) {
          return <></>;
        }
      }
      return (
        <Descriptions.Item label={item.label} key={item.key}>
          <InputComfirm item={item} onOk={(val: number) => handleInputChange(item, val, setType)} />
        </Descriptions.Item>
      );
    }
    if (item.type === 'select') {
      return (
        <Descriptions.Item label={item.label} key={item.key}>
          <SelectPick onSelect={(val) => handleValuechange(item, val, setType)} value={value} options={item.options} />
        </Descriptions.Item>
      );
    }
    if (item.type === 'date') {
      return (
        <Descriptions.Item label={item.label} key={item.key}>
          <DatePicker onOk={(val) => handleDatechange(item, val, setType)} showTime value={value ? dayjs(value) : null} format={'YYYY-MM-DD HH:mm'} />
        </Descriptions.Item>
      );
    }
    if (item.type === 'time') {
      return (
        <Descriptions.Item label={item.label} key={item.key}>
          <TimePicker onOk={(val) => handleTimeChange(item, val, setType)} value={dayjs(item.value, 'HH:mm')} format={'HH:mm'} />
        </Descriptions.Item>
      );
    }
    return <></>;
  };

  const tilte = (
    <Space>
      <Badge status={isConnected ? 'success' : 'default'} />
      <span>调试设置</span>
    </Space>
  );
  const epsEn = deviceInfo?.shadow?.shadow?.state?.setData?.epsEn;
  const online = deviceInfo?.collector?.status === 1;
  const isMode = modalState.workMode === ModelEnum.timerMode || modalState.workMode === ModelEnum.selfPower || modalState.workMode === ModelEnum.backup;
  return (
    <Spin spinning={isMutating}>
      <Auth auth="device:cmd:send">
        <Card type="inner" bodyStyle={{ padding: 0 }} title={tilte} style={{ padding: 0, backdropFilter: 'blur(2px)', background: '#fcfcfc', minWidth: '400px', minHeight: '400px' }}>
          <Collapse ghost bordered={false} accordion defaultActiveKey={['system']}>
            <Collapse.Panel header="system" key="system">
              <Descriptions column={1}>{systemSetting.map((item: any) => renderItem(item, 'systemSetting'))}</Descriptions>
            </Collapse.Panel>
            <Collapse.Panel header="application" key="application">
              <Descriptions column={1}>{applicationSetting.map((item: any) => renderItem(item, 'applicationSetting'))}</Descriptions>
            </Collapse.Panel>
            <Collapse.Panel header="grid" key="grid">
              <Descriptions column={1}>{gridConnectSetting.map((item: any) => renderItem(item, 'gridConnectSetting'))}</Descriptions>
            </Collapse.Panel>
            <Collapse.Panel header="charge" key="charge">
              <Descriptions column={1}>{chargeSetting.map((item: any) => renderItem(item, 'chargeSetting'))}</Descriptions>
            </Collapse.Panel>
            <Collapse.Panel header="disCharge" key="disCharge">
              <Descriptions column={1}>{dischargeSetting.map((item: any) => renderItem(item, 'dischargeSetting'))}</Descriptions>
            </Collapse.Panel>
            <Collapse.Panel header="modal" key="modal">
              <Descriptions column={1}>
                <Descriptions.Item>
                  <Segmented value={modalState.workMode as ModelEnum} onChange={(val) => handleModalChange(val, 'workMode')} options={[ModelEnum.backup, ModelEnum.selfPower, ModelEnum.timerMode]} />
                </Descriptions.Item>
                <Descriptions.Item>
                  <Space>
                    <span>soc</span>
                    <InputNumber onChange={(val) => handleModalChange(val, 'eod')} value={modalState.eod} max={100} min={5} step={1}></InputNumber>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item>
                  <Space>
                    <span>maxBackFlow</span>
                    <InputNumber onChange={(val) => handleModalChange(val, 'maxBackFlow')} value={modalState.maxBackFlow} max={12} min={0}></InputNumber>
                  </Space>
                </Descriptions.Item>
                {modalState.peekPeriod.map((item: any, index: number) => (
                  <Descriptions.Item key={item.index}>
                    <Space>
                      <span>时间1</span>
                      <TimePicker format={'HH:mm'} value={dayjs(modalState.peekPeriod[index]?.startTime ?? '00:00', 'HH:mm')} onChange={(_, str) => handleModalTimeChange(str, index, 'startTime')} clearIcon={false} />
                      <TimePicker format={'HH:mm'} value={dayjs(modalState.peekPeriod[index]?.endTime ?? '00:00', 'HH:mm')} onChange={(_, str) => handleModalTimeChange(str, index, 'endTime')} clearIcon={false} />
                    </Space>
                  </Descriptions.Item>
                ))}
              </Descriptions>
              <Descriptions.Item>
                {/*  */}
                <Button disabled={!epsEn || !online || !isMode} onClick={handeModalCMD} type="primary" size="small">
                  send
                </Button>
              </Descriptions.Item>
            </Collapse.Panel>
          </Collapse>
        </Card>
      </Auth>
    </Spin>
  );
};
export default Index;
