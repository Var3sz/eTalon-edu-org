import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { UpdatePaymentsDto } from './entities/invoice.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Invoice')
@ApiBearerAuth()
@UseGuards(JwtGuard)
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
