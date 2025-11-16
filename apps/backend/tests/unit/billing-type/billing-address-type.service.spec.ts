import { PrismaService } from 'nestjs-prisma';

import { BillingAddressTypeService } from '../../../src/billing-type/billing-address-type.service';
import { BillingAddressTypeDto } from '../../../src/billing-type/entities/billing-address-type.entity';

describe('BillinAddressTypeService', () => {
  let prismaService: PrismaService;
  let billingTypeService: BillingAddressTypeService;

  beforeEach(() => {
    prismaService = {
      billingAddressType: {
        findMany: jest.fn(),
      },
    } as unknown as PrismaService;
    billingTypeService = new BillingAddressTypeService(prismaService);
  });

  describe('getBillingAddressTypes', () => {
    it('should return all billing address types', async () => {
      const rows: BillingAddressTypeDto[] = [
        { id: 1, description: 'Type1' },
        { id: 2, description: 'Type2' },
      ];

      (prismaService as any).billingAddressType.findMany.mockResolvedValue(rows);

      const result = await billingTypeService.getBillingAddressTypes();

      expect(result).toEqual(rows);
      expect((prismaService as any).billingAddressType.findMany).toHaveBeenCalledTimes(1);
      expect((prismaService as any).billingAddressType.findMany).toHaveBeenCalledWith();
    });
  });
});
