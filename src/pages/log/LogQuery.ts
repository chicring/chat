
interface LogQuery {
  channelId?: number;
  channelType?: string;
  channelName?: string;
  userId?: number;
  model?: string;
  ip?: string;
  startTime?: number;
  endTime?: number;
  page?: number;
  size?: number;
}

export const createQuery = ({
                       channelId,
                       channelType,
                       channelName,
                       userId,
                       model,
                       ip,
                       startTime,
                       endTime,
                       page,
                       size
                     }: Partial<LogQuery> = {}) => ({
  channelId: channelId || null,
  channelType,
  channelName,
  userId,
  model,
  ip,
  startTime,
  endTime,
  page,
  size
});
