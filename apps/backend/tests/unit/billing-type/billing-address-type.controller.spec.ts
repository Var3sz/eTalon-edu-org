import { Test } from '@nestjs/testing';
import { BillingAddressTypeController } from 'src/billing-type/billing-address-type.controller';
import { BillingAddressTypeService } from 'src/billing-type/billing-address-type.service';
import { BillingAddressTypeDto } from 'src/billing-type/entities/billing-address-type.entity';

describe('BillingAddressTypeController', () => {
  let controller: BillingAddressTypeController;

  const serviceMock = {
    getBillingAddressTypes: jest.fn<Promise<BillingAddressTypeDto[]>, []>(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      controllers: [BillingAddressTypeController],
      providers: [{ provide: BillingAddressTypeService, useValue: serviceMock }],
    }).compile();

    controller = module.get<BillingAddressTypeController>(BillingAddressTypeController);
  });

  it('Controller delegates to the service and returns the billing address type data data', async () => {
    const rows: BillingAddressTypeDto[] = [
      { id: 1, description: 'Company' },
      { id: 2, description: 'Private' },
    ];
    serviceMock.getBillingAddressTypes.mockResolvedValue(rows);

    const result = await controller.getBillingAddressTypes();

    expect(result).toEqual(rows);
    expect(serviceMock.getBillingAddressTypes).toHaveBeenCalledTimes(1);
    expect(serviceMock.getBillingAddressTypes).toHaveBeenCalledWith();
  });
});
