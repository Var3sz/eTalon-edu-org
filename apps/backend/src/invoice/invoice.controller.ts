import { Body, Controller, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { UpdatePaymentsDto } from './entities/invoice.entity';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Put('/UpdateStudentPayments')
  @ApiOkResponse()
  @ApiBody({ type: UpdatePaymentsDto, isArray: true })
  async UpdateStudentPayments(@Body() payments: UpdatePaymentsDto[]) {
    return this.invoiceService.updatePaymentBulk(payments);
  }
}
