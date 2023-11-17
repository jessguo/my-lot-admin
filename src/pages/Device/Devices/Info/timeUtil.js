// 时间格式化函数
function formatMinute(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// 将时间区间转化为分钟计数
function timeToMinutes(time) {
  let [hour, minute] = time.split(':');
  return parseInt(hour) * 60 + parseInt(minute);
}

// 主函数
export function findGaps(periods) {
  // 转换所有时间段为分钟，并排序
  let minutesPeriods = periods
    .flatMap(({ startTime, endTime }) => {
      let startMinutes = timeToMinutes(startTime);
      let endMinutes = timeToMinutes(endTime);

      if (startMinutes > endMinutes) {
        // 如果开始时间大于结束时间，则我们有一个跨天的时间段。
        // 我们将其拆分为两个独立的时间段：一个从开始时间到午夜，另一个从午夜到结束时间。
        return [
          [startMinutes, 24 * 60],
          [0, endMinutes],
        ];
      } else {
        return [[startMinutes, endMinutes]];
      }
    })
    .sort((a, b) => a[0] - b[0]);

  let result = [];
  let currentEnd = 0;
  for (let [start, end] of minutesPeriods) {
    if (start > currentEnd) {
      result.push({
        startTime: formatMinute(currentEnd),
        endTime: formatMinute(start),
      });
    }
    if (end > currentEnd) {
      currentEnd = end;
    }
  }

  // 如果最后一个时间段不是23:59，则添加最后一个空闲时间段
  if (currentEnd < 24 * 60) {
    result.push({
      startTime: formatMinute(currentEnd),
      endTime: '24:00',
    });
  }
  if (result.length > 1 && result[0].startTime === '00:00' && result[result.length - 1].endTime === '24:00') {
    result[0].startTime = result[result.length - 1].startTime;
    result.pop();
  }

  result.map((item) => {
    if (item.startTime === '24:00') {
      item.startTime = '00:00';
    }
    if (item.endTime === '24:00') {
      item.endTime = '00:00';
    }
  });

  return result;
}
