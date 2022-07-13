import moment from 'moment';

export const getContestTimeDiff = (createdAt) => {
  const diff = moment().diff(moment(createdAt));
  const duration = moment.duration(diff);

  let str = '';
  if (duration._data.days !== 0) str = `${duration._data.days} days `;
  if (duration._data.hours !== 0) str += `${duration._data.hours} hours`;
  if (str.length === 0) str = 'less than one hour';
  return str;
};
