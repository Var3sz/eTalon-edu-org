import { Test } from '@nestjs/testing';
import { LocationDto } from 'src/location/entities/location.entity';
import { LocationsController } from 'src/location/location.controller';
import { LocationService } from 'src/location/location.service';

describe('LocationsController', () => {
  let controller: LocationsController;

  const serviceMock = {
    getLocations: jest.fn<Promise<LocationDto[]>, []>(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [{ provide: LocationService, useValue: serviceMock }],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('Controller delegates to the service and returns the location data', async () => {
    const rows: LocationDto[] = [
      { id: 1, description: 'Erzsébet körút', isDeleted: 'N' },
      { id: 2, description: 'Számalk', isDeleted: 'N' },
    ];
    serviceMock.getLocations.mockResolvedValue(rows);

    const result = await controller.getLocations();

    expect(result).toEqual(rows);
    expect(serviceMock.getLocations).toHaveBeenCalledTimes(1);
    expect(serviceMock.getLocations).toHaveBeenCalledWith();
  });
});
