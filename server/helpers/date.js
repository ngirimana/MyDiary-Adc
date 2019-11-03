import date from 'date-and-time';

export const currentDate = () => {
  const now = new Date();
  const timeDate = date.format(now, 'YYYY/MM/DD - HH:mm:ss');
  return timeDate;
};
