import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateTimeToTimestamp = (date: string): number => {
  return dayjs(date).valueOf();
};

export const timestampToDateTime = (timestamp: number): string => {
  return dayjs(timestamp).utc().format(dateTimeFormat);
};

export const appendUTCOffset = (date: Date | null): Date | null => {
  if (date === null) {
    return null;
  }
  return date + 'Z';
};

export const getNowTimestampUtc = (): number => {
  return dayjs().utc().valueOf();
};
