import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { config, listFields, NewStudentsDto } from 'src/api/consts/SAPI';

const SAPI_URL = 'https://api.salesautopilot.com/list/136861/order/subdate/asc';

@Injectable()
export class SAPIService {
  constructor(private readonly httpService: HttpService) {}

  async fetchStudents(latestSubDate: string): Promise<NewStudentsDto[]> {
    const body = [
      {
        field: 'subdate',
        operator: '>',
        value: latestSubDate,
      },
      {
        listFields,
      },
    ];

    const response = await firstValueFrom(this.httpService.post(SAPI_URL, body, config));
    return response.data;
  }
}
