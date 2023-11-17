import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import { dayFormart } from '../config';
// import JsonViewer from 'react-json-view';

import dayjs from 'dayjs';
const messageMap = new Map([
  ['MESSAGE_TYPE_DEVICE_REALTIME_DATA', '实时数据'],
  ['MESSAGE_TYPE_DEVICE_SETTING', '设备控制'],
  ['MESSAGE_TYPE_UPDATE', '检查更新'],
  ['MESSAGE_TYPE_DEVICE_STATIC_INFO', '静态信息'],
  ['MESSAGE_TYPE_RESULT', '返回消息'],
  ['MESSAGE_TYPE_DEVICE_FAULT', '设备故障'],
  ['default', '其它情况直接显示'],
]);

// import { Copyspan } from '@/components';

export interface Recod {
  model: any;
  collector: any;
}

export const sourceColumns: ColumnsType<Recod> = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render(text: string) {
      return dayjs(text).format(dayFormart);
    },
  },
  {
    title: '时间戳',
    dataIndex: 'timestamp',
    key: 'timestamp',
    align: 'center',
    render(text: string) {
      return dayjs(text).format(dayFormart);
    },
  },
  {
    title: '数据类型',
    dataIndex: 'dataType',
    key: 'dataType',
    align: 'center',
  },
  {
    title: '数据ID',
    dataIndex: 'uuid',
    key: 'uuid',
    align: 'center',
  },
];

export const taskColumns: ColumnsType<Recod> = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },
  {
    title: '任务ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 220,

    render(text: string) {
      return text ? dayjs(text).format(dayFormart) : '--';
    },
  },
  // {
  //   title: '完成时间',
  //   dataIndex: 'finishAt',
  //   key: 'finishAt',
  //   align: 'center',
  //   width: 220,
  //   render(text: string) {
  //     return text ? dayjs(text).format(dayFormart) : '--';
  //   },
  // },
  {
    title: '执行时长',
    dataIndex: 'end',
    key: 'end',
    align: 'center',
    width: 220,
    render(_: string, record: any) {
      const { finishAt, createdAt } = record;
      if (finishAt && finishAt) {
        const diffInMilliseconds = dayjs(finishAt).diff(dayjs(createdAt));
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000); // 转换成秒
        return `${diffInSeconds}秒`;
      }
      return '--';
    },
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 180,
    render: (text: number) => {
      if (text === 0) return <Tag color="processing">pending</Tag>;
      if (text === 1) return <Tag color="success">success</Tag>;
      if (text === 2) return <Tag color="error">error</Tag>;
      if (text === 3) return <Tag color="red">cancel</Tag>;

      return <Tag>--</Tag>;
    },
  },
  // {
  //   title: '下发数据',
  //   dataIndex: 'sourceData',
  //   key: 'sourceData',
  //   render(text: any) {
  //     return text ? <JsonViewer name={null} indentWidth={2} collapsed={1} src={text} /> : '--';
  //   },
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'remark',
  //   key: 'remark',
  //   align: 'center',
  //   width: 260,
  // },
];
const emsData = ['data', 'realtimeData', 'emsData'];
const bmsData = ['data', 'realtimeData', 'bmsData', '0'];
const pcsData = ['data', 'realtimeData', 'pcsData'];
const emsSetting = ['data', 'setting', 'emsSetting'];

const settingColumns = [
  {
    title: '充电开关',
    dataIndex: [...emsSetting, 'chargeEnable'],
    align: 'center',
    render(text: boolean) {
      return text ? '开' : '关';
    },
  },
  {
    title: 'AC开关',
    dataIndex: [...emsSetting, 'acOutputEnable'],
    align: 'center',
    render(text: boolean) {
      return text ? '开' : '关';
    },
  },
  {
    title: 'DC开关',
    dataIndex: [...emsSetting, 'dcOutputEnable'],
    align: 'center',
    render(text: boolean) {
      return text ? '开' : '关';
    },
  },
  {
    title: 'UPS开关',
    dataIndex: [...emsSetting, 'upsEnable'],
    align: 'center',
    render(text: boolean) {
      return text ? '开' : '关';
    },
  },
  {
    title: '时间模式开关',
    dataIndex: [...emsSetting, 'timerMode'],
    align: 'center',
    render(text: boolean) {
      return text ? '开' : '关';
    },
  },
  {
    title: '时间模式范围',
    dataIndex: [...emsSetting, 'timeSlices', '0'],
    align: 'center',
    render(text: any) {
      return text ? `${text.startHour}:${text.startMinute}` + '-' + `${text.endHour}:${text.endMinute}` : '--';
    },
  },
  {
    title: '时间模式备电阈值',
    dataIndex: [...emsSetting, 'ecoReservedSoc'],
    align: 'center',
  },
  {
    title: '最大充电电流',
    dataIndex: [...emsSetting, 'maxChargeCurrent'],
    align: 'center',
  },
  {
    title: 'UPS充电阈值',
    dataIndex: [...emsSetting, 'upsAutoChargeSoc'],
    align: 'center',
  },
  {
    title: '240V放电',
    dataIndex: [...emsSetting, 'discharge240Enable'],
    align: 'center',
    render(text: boolean) {
      return text ? '开' : '关';
    },
  },
];
const realtimeDataCommonColumns = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },
  {
    title: 'SOC',
    dataIndex: [...emsData, 'socUser'],
    key: 'SOC',
    align: 'center',
  },
  {
    title: '时间戳',
    dataIndex: 'timestamp',
    key: 'timestamp',
    align: 'center',
    width: 120,
    render: (text: string) => text && dayjs(text).format(dayFormart),
  },
  {
    title: '数据类型',
    dataIndex: ['data', 'type'],
    align: 'center',
    render: (text: string) => (messageMap.has(text) ? messageMap.get(text) : text),
  },
  {
    title: '光伏输入功率',
    dataIndex: [...emsData, 'powerPv'],
    key: 'sn',
    align: 'center',
  },
  {
    title: '电网功率',
    dataIndex: [...emsData, 'powerGrid'],
    align: 'center',
  },
  {
    title: '负载功率',
    dataIndex: [...emsData, 'powerLoad'],
    align: 'center',
  },
  {
    title: '温度',
    dataIndex: [...bmsData, 'temp'],
    align: 'center',
  },
  {
    title: '交流输出电压',
    dataIndex: [...pcsData, 'acVolt'],
    align: 'center',
  },
  {
    title: '交流输出电流',
    dataIndex: [...pcsData, 'acCurrent'],
    align: 'center',
  },
  {
    title: '直流输出电压',
    dataIndex: [...pcsData, 'dcVolt'],
    align: 'center',
  },
  {
    title: '直流输出电流',
    dataIndex: [...pcsData, 'dcCurrent'],
    align: 'center',
  },
  {
    title: 'AC功率',
    dataIndex: [...pcsData, 'acPower'],
    align: 'center',
  },
  {
    title: 'DC功率',
    dataIndex: [...emsData, 'dcPower'],
    align: 'center',
  },
  {
    title: '软件版本',
    dataIndex: ['data', 'info', 'versionEms', 'versionSoftware'],
    align: 'center',
  },
  {
    title: '硬件版本',
    dataIndex: ['data', 'info', 'versionEms', 'versionHardware'],
    align: 'center',
  },
  {
    title: '逆变器故障信息',
    dataIndex: [...pcsData, 'errorInfo'],
    align: 'center',
    render(text: any) {
      return text ? text.join(',') : text;
    },
  },
];

const realtimeMpuColumns = [
  {
    title: '合体',
    dataIndex: [...emsData, 'parallelInfo', 'id'],
    align: 'center',
    render(text: boolean) {
      return text ? '合体' : '分开';
    },
  },
  {
    title: '合体SOC',
    dataIndex: [...emsData, 'parallelInfo', 'soc'],
    align: 'center',
  },
  {
    title: '合体负载功率',
    dataIndex: [...emsData, 'parallelInfo', 'powerLoad'],
    align: 'center',
  },
  {
    title: '合体电网功率',
    dataIndex: [...emsData, 'parallelInfo', 'powerGrid'],
    align: 'center',
  },
  {
    title: '合体光伏输入功率',
    dataIndex: [...emsData, 'parallelInfo', 'powerPv'],
    align: 'center',
  },
];
export const orderColumns_mpe: any = [
  ...realtimeDataCommonColumns,
  // 设置
  ...settingColumns,
];
export const orderColumns_mpu: any = [
  ...realtimeDataCommonColumns,
  // mpu
  ...realtimeMpuColumns,
  // 设置
  ...settingColumns,
];
// modbuse Colmus
export const modbusColumns: ColumnsType<Recod> = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },

  {
    title: '时间戳',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 180,
    render(text: string) {
      return dayjs(text).format(dayFormart);
    },
  },

  {
    title: '任务结果',
    dataIndex: ['resultData', 'result', 'code'],
    key: 'type',
    align: 'center',
  },
  {
    title: '发送指令',
    dataIndex: ['sourceData', 'cmd'],
    key: 'sourceData',
    align: 'center',
    ellipsis: true,
    // render(text: string) {
    //   return <Copyspan text={text}></Copyspan>;
    // },
  },

  {
    title: '回复指令',
    dataIndex: ['resultData', 'mpmUs', 'modbusTransparent', 'replyData'],
    key: 'taskParams',
    align: 'center',
    ellipsis: true,
    // render(text: string) {
    //   return <Copyspan text={text}></Copyspan>;
    // },
  },
];

export const errorColunms: ColumnsType<Recod> = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    render: (_: string, __: any, index: number) => index + 1,
  },
  {
    title: '时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render(text: string) {
      return dayjs(text).format(dayFormart);
    },
  },
  {
    title: 'code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
  },
];
