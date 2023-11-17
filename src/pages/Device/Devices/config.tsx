import { TablePaginationConfig, Space, Skeleton } from 'antd';
const initTimeDate = '00:00';

export const selectOptions = [
  { value: '1', label: '在线' },
  { value: '2', label: '离线' },
  { value: '', label: '全部' },
];

export const initPagination: TablePaginationConfig = Object.freeze({ current: 1, pageSize: 10, total: 0, showSizeChanger: false });

export const LoadingSketch = () => (
  <>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Space>
  </>
);

export const timeZones = [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const hourFormat = 'HH:mm';
export const dayFormart = 'YYYY-MM-DD HH:mm:ss';
export const systemSettingList = [
  {
    label: 'System Time',
    key: 'systemTime',
    type: 'date',
    value: '',
  },
  {
    label: 'Com Addr',
    key: 'comAddr',
    type: 'number',
    placeholder: '[0-150]',

    value: '',
    range: [0, 150],
  },
  {
    label: 'PV Input Model',
    type: 'select',
    key: 'pvInputModel',
    value: '',
    options: [
      { value: 0, label: 'No PV Panel' },
      { value: 1, label: 'PV1 Only' },
      { value: 2, label: 'PV2 Only' },
      { value: 3, label: 'PV3 Only' },
      { value: 4, label: 'PV1 & PV2' },
      { value: 5, label: 'PV1 & PV3' },
      { value: 6, label: 'PV2 & PV3' },
      {
        value: 7,
        label: 'PV1 & PV2 & PV3',
      },
    ],
  },
  {
    label: 'Start PV Volt(V)',
    key: 'startPvVolt',
    type: 'number',
    placeholder: 'V[140, 450]',
    scale: 1,
    range: [140, 450],
  },
  {
    label: 'CT Sample Ratio',
    key: 'ctSampleRatio',
    type: 'select',
    value: null,
    options: [
      { value: 0, label: '1/1000' },
      { value: 1, label: '1/3000' },
    ],
  },

  {
    label: 'PV CT Sample Type',
    key: 'pvCtSampleType',
    type: 'select',
    value: null,
    options: [
      {
        value: 0,
        label: 'PV Power',
      },
      { value: 1, label: 'Spec Load' },
    ],
  },
  {
    label: 'PV CT Sample Ratio',
    key: 'pvCtSampleRatio',
    type: 'select',
    value: null,
    options: [
      { value: 0, label: '1/1000' },
      { value: 1, label: '1/3000' },
    ],
  },
];
export const applicationSettingList = [
  {
    label: 'Power Backup Enable',
    key: 'epsEn',
    type: 'toggle',
    value: false,
  },
  {
    label: 'PV Grid Off Enable',
    key: 'ubPvGridOffEn',
    type: 'toggle',
    value: false,
  },
  {
    label: 'Grid Sell Back',
    key: 'feedInGridEn',
    type: 'toggle',
    value: false,
  },
  {
    label: 'Grid Sell Back Power(KW)',
    key: 'maxBackFlow',
    type: 'number',
    placeholder: 'KW[0-25]',
    range: [0, 25],
    scale: 1,
  },
  {
    label: 'System Type',
    key: 'setSystemType',
    type: 'select',
    options: [
      {
        value: 'MPM_SYSTEMP_TYPE_NO_PARALLEL',
        label: 'no parallel',
      },
      {
        value: 'MPM_SYSTEMP_TYPE_SINGLE_PHASE_PARALLEL',
        label: '1 Phase Primary',
      },
      {
        value: 'MPM_SYSTEMP_TYPE_SLAVE',
        label: 'Subordinates',
      },
      {
        value: 'MPM_SYSTEMP_TYPE_THREE_PHASE_PARALLEL',
        label: '3 Phase Primary',
      },
    ],
  },
  {
    label: 'Composed Phase On Grid',
    key: 'setComposedPhaseOnGrid',
    type: 'select',
    options: [
      // {
      //   value: 1,
      //   label: 'Clear Detected Phases',
      // },
      { value: 'MPM_COMPOSED_PHASE_R', label: 'R Phase' },
      { value: 'MPM_COMPOSED_PHASE_S', label: 'S Phase' },
      { value: 'MPM_COMPOSED_PHASE_T', label: 'T Phase' },
    ],
  },
  {
    label: 'Composed Phase Off Grid',
    key: 'setComposedPhaseOffGrid',
    type: 'select',
    options: [
      // {
      //   value: 1,
      //   label: 'Clear Detected Phases',
      // },
      { value: 'MPM_COMPOSED_PHASE_R', label: 'R Phase' },
      { value: 'MPM_COMPOSED_PHASE_S', label: 'S Phase' },
      { value: 'MPM_COMPOSED_PHASE_T', label: 'T Phase' },
    ],
  },
  {
    label: 'Max AC Input Power',
    key: 'maxGridInputPower',
    scale: 1,
    type: 'number',
    placeholder: '[0, 6553.4]',
    range: [0, 6553.4],
  },
  {
    label: 'Battery Shared',
    key: 'ubBatShared',
    type: 'toggle',
    value: false,
  },
];
export const gridConnectSettingList = [
  {
    label: 'Connect Time(S)',
    key: 'connectTime',
    type: 'number',
    value: null,
    placeholder: 's',
  },
  {
    label: 'Reconnect Time(S)',
    key: 'reconnectTime',
    type: 'number',
    value: '',
    placeholder: 's',
  },
  {
    label: 'Grid Volt Connect High(V)',
    key: 'gridVoltConnHigh',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Volt Connect Low(V)',
    key: 'gridVoltConnLow',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Freq Connect High(Hz)',
    key: 'gridFreqConnHigh',
    type: 'number',
    value: '',
    placeholder: 'HZ',
    scale: 2,
  },

  {
    label: 'Grid Freq Connect Low(Hz)',
    key: 'gridFreqConnLow',
    type: 'number',
    value: '',
    placeholder: 'HZ',
    scale: 2,
  },

  {
    label: 'Grid Volt Limit1 Low(V)',
    key: 'gridVoltLimit1Low',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Volt Limit1 High(V)',
    key: 'gridVoltLimit1High',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Volt Limit2 Low(V)',
    key: 'gridVoltLimit2Low',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Volt Limit2 High(V)',
    key: 'gridVoltLimit2High',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Volt Limit3 Low(V)',
    key: 'gridVoltLimit3Low',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Volt Limit3 High(V)',
    key: 'gridVoltLimit3High',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  {
    label: 'Grid Volt Move Avg High(V)',
    key: 'gridVoltMovAvgHigh',
    type: 'number',
    value: '',
    placeholder: 'V',
    scale: 1,
  },
  // {
  //   label: 'Grid Volt Move Avg Low(V)',
  //   key: 'gridVoltMovAvgLow',
  //   type: 'number',
  //   value: '',
  //   placeholder: 'HZ',
  //   scale: 2,
  // },
  {
    label: 'Grid Freq Limit1 High(Hz)',
    key: 'gridFreqLimit1High',
    type: 'number',
    value: '',
    placeholder: 'HZ',
    scale: 2,
  },
  {
    label: 'Grid Freq Limit2 Low(Hz)',
    key: 'gridFreqLimit2Low',
    type: 'number',
    value: '',
    placeholder: 'HZ',
    scale: 2,
  },
  {
    label: 'Grid Freq Limit2 High(Hz)',
    key: 'gridFreqLimit2High',
    type: 'number',
    value: '',
    placeholder: 'HZ',
    scale: 2,
  },
  {
    label: 'Grid Freq Limit3 Low(Hz)',
    key: 'gridFreqLimit3Low',
    type: 'number',
    value: '',
    placeholder: 'HZ',
    scale: 2,
  },
  {
    label: 'Grid Freq Limit3 High(Hz)',
    key: 'gridFreqLimit3High',
    type: 'number',
    value: '',
    placeholder: 'HZ',
    scale: 2,
  },
  {
    label: 'Voltage-Active Power Mode',
    key: 'voltWattEn',
    type: 'toggle',
    value: false,
  },
  {
    label: 'Volt-Watt V1(V)',
    key: 'voltWattV1',
    type: 'number',
    value: '',
    scale: 1,
  },
  {
    label: 'Volt-Watt V2(V)',
    key: 'voltWattV2',
    type: 'number',
    value: '',
    scale: 1,
  },
];
export const chargeSettingList = [
  {
    label: 'System Charge Power(KW)',
    key: 'chargePowerPercentCmd',
    type: 'number',
    value: '',
    placeholder: 'KW',
    range: [0, 100],
  },
  // {
  //   label: 'Equalization Voltage(V)',
  //   key: 'equalizationVolt',
  //   type: 'number',
  //   value: '',
  //   placeholder: 'V(50-59)',
  //   range: [50, 59],
  // },
  // {
  //   label: 'Equalization Period(Days)',
  //   key: 'equalizationInterval',
  //   type: 'number',
  //   value: '',
  //   placeholder: 'Days(0-365)',
  //   range: [0, 365],
  // },
  // {
  //   label: 'Equalization Time(Hours)',
  //   key: 'equalizationTime',
  //   type: 'number',
  //   value: '',
  //   placeholder: 'Hours(0-24)',
  //   range: [0, 24],
  // },
  {
    label: 'AC Charge Enable',
    key: 'acChargeEn',
    type: 'toggle',
    value: false,
  },
  {
    label: 'Grid Charge Power(KW)',
    key: 'acChargePowerCmd',
    type: 'number',
    value: '',
    placeholder: 'KW[0, 12]',
    scale: 1,
    range: [0, 12],
  },
  {
    label: 'Grid Charge Power Level(%)',
    key: 'acChargeSocLimit',
    type: 'number',
    value: '',
    placeholder: '%',
    range: [0, 100],
  },
  {
    label: 'AC Charge Start Time 1',
    key: 'acChargeStartTime1',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'AC Charge End Time 1',
    key: 'acChargeEndTime1',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'AC Charge Start Time 2',
    key: 'acChargeStartTime2',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'AC Charge End Time 2',
    key: 'acChargeEndTime2',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'AC Charge Start Time 3',
    key: 'acChargeStartTime3',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'AC Charge End Time 3',
    key: 'acChargeEndTime3',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Charge Priority',
    key: 'forcedChargeEn',
    type: 'toggle',
    value: false,
  },
  {
    label: 'Priority Charge(KW)',
    key: 'chargeFirstPowerCmd',
    type: 'number',
    value: '',
    placeholder: 'KW',
    scale: 1,
    range: [0, 12],
  },
  {
    label: 'Priority Charge Level',
    key: 'chargeFirstSocLimit',
    type: 'number',
    value: '',
    placeholder: '%',
    range: [0, 100],
  },
  {
    label: 'Charge First Start Time 1',
    key: 'chargeFirstStartTime1',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Charge First End Time 1',
    key: 'chargeFirstEndTime1',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Charge First Start Time 2',
    key: 'chargeFirstStartTime2',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Charge First End Time 2',
    key: 'chargeFirstEndTime2',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Charge First Start Time 3',
    key: 'chargeFirstStartTime3',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Charge First End Time 3',
    key: 'chargeFirstEndTime3',
    type: 'time',
    value: initTimeDate,
  },
];
export const dischargeSettingList = [
  {
    label: 'System DisCharge Power(KW)',
    key: 'dischargePowerPercentCmd',
    type: 'number',
    value: '',
    placeholder: '%',
    range: [0, 100],
  },
  {
    label: 'Force Discharge Enable',
    key: 'forcedDischargeEn',
    type: 'toggle',
    value: false,
  },
  {
    label: 'Forced Discharge Power(KW)',
    key: 'forcedDischgPowerCmd',
    type: 'number',
    value: '',
    placeholder: 'KW[0,12]',
    scale: 1,
    range: [0, 12],
  },
  {
    label: 'Forced Discharge Battery Level(%)',
    key: 'forcedDischgSocLimit',
    type: 'number',
    value: '',
    placeholder: '%',
    range: [0, 100],
  },
  {
    label: 'Forced Discharge Start Time 1',
    key: 'forcedDischargeStartTime1',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Forced Discharge End Time 1',
    key: 'forcedDischargeEndTime1',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Forced Discharge Start Time 2',
    key: 'forcedDischargeStartTime2',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Forced Discharge End Time 2',
    key: 'forcedDischargeEndTime2',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Forced Discharge Start Time 3',
    key: 'forcedDischargeStartTime3',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'Forced Discharge End Time 3',
    key: 'forcedDischargeEndTime3',
    type: 'time',
    value: initTimeDate,
  },
  {
    label: 'On-grid Discharge Cut-off Soc(%)',
    key: 'eod',
    type: 'number',
    value: '',
    placeholder: '%[0,90]',
    range: [0, 90],
  },
  {
    label: 'Off-grid Discharge Cut-off Soc(%)',
    key: 'socLowLimitForEpsDischg',
    type: 'number',
    value: '',
    placeholder: '%[0,90]',
    range: [0, 90],
  },
  {
    label: 'On-grid Discharge Cut-off Volt(V)',
    key: 'onGridEodVoltage',
    type: 'number',
    value: '',
    placeholder: 'V[40,52]',
    range: [40, 56],
    scale: 1,
  },
  {
    label: 'Discharge Cut-off Volt(V)',
    key: 'cutVoltForDischg',
    type: 'number',
    value: '',
    placeholder: 'V[40, 52]',
    range: [40, 52],
    scale: 1,
  },
  {
    label: 'Discharge Current Limit(A)',
    key: 'dischgCurr',
    type: 'number',
    value: '',
    placeholder: 'A [0, 250]',
    range: [0, 250],
  },
];

// export const ULComplianceSettingList = [];
