import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CatEntity } from "./entities/cats.entity";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  constructor(
    @InjectRepository(CatEntity)
    private catsRepository: Repository<Cat>,
  ) {}

  async create(cat: CreateCatDto): Promise<CatEntity> {
    const newCat = this.catsRepository.create(cat);
    await this.catsRepository.save(newCat);
    return newCat;
  }

  async findAll(): Promise<CatEntity[]> {
    return await this.catsRepository.find();
  }
  async findOne(id: number): Promise<CatEntity> {
    return await this.catsRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, cat: UpdateCatDto): Promise<CatEntity> {
    const updateResult = await this.catsRepository.update(id, cat);
    if (updateResult.affected > 0) {
      return this.catsRepository.findOne({
        where: { id: id },
      });
    }
  }
  async delete(id: number): Promise<CatEntity> {
    const cat = await this.catsRepository.findOne({
      where: { id: id },
    });
    if (cat) {
      await this.catsRepository.delete(id);
      return cat;
    }
  }
}
