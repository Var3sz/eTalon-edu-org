import { UpdateAttendances } from '../../../api/models/serviceEndpoints/main';
import { UpdateAttendanceDto } from '../types';

export const UpdateAttendancesRequest = async (attendanceData: UpdateAttendanceDto[], token: string) => {
  return await UpdateAttendances<UpdateAttendanceDto[], any>(attendanceData, token);
};
