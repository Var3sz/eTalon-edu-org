import { PrismaService } from 'nestjs-prisma';
import { LocationDto } from 'src/location/entities/location.entity';
import { LocationService } from 'src/location/location.service';

describe('LocationService', () => {
  let prismaService: PrismaService;
  let locationService: LocationService;

  beforeEach(() => {
    prismaService = {
      location: {
        findMany: jest.fn(),
      },
    } as unknown as PrismaService;
    locationService = new LocationService(prismaService);
  });

  describe('getLocations', () => {
    it('should return all locations', async () => {
      const rows: LocationDto[] = [
        { id: 1, description: 'Loc1' },
        { id: 2, description: 'Loc2' },
      ];

      (prismaService as any).location.findMany.mockResolvedValue(rows);

      const result = await locationService.getLocations();

      expect(result).toEqual(rows);
      expect(prismaService.location.findMany).toHaveBeenCalledTimes(1);
      expect(prismaService.location.findMany).toHaveBeenCalledWith();
    });
  });
});
