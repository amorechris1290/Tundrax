import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cats.entity';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: CatEntity[] = [
        {
          id: 1,
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
        },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await catsController.findAll()).toBe(result);
    });
  });
  describe('findOne', () => {
    it('should return a single cat', async () => {
      const result: CatEntity = {
        id: 1,
        age: 2,
        breed: 'Bombay',
        name: 'Pixel',
      };
      jest.spyOn(catsService, 'findOne').mockImplementation(() => Promise.resolve(result));

      expect(await catsController.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a cat', async () => {
      const result: CatEntity = {
        id: 1,
        age: 3,
        breed: 'Bombay',
        name: 'Pixel',
      };
      const updateCatDto: UpdateCatDto = {
        age: 3,
        breed: 'Bombay',
        name: 'Pixel',
      };
      jest.spyOn(catsService, 'update').mockImplementation(() => Promise.resolve(result));

      expect(await catsController.update(1, updateCatDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a cat', async () => {
      jest.spyOn(catsService, 'delete').mockImplementation(() => Promise.resolve(undefined));

      expect(await catsController.delete(1)).toBeUndefined();
    });
  });
});
