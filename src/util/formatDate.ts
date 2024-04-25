import dayjs from 'dayjs';

export const formatDate = (timestamp) => {
  return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}
