/* eslint-disable @typescript-eslint/naming-convention */
import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICatetoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }
  async list(): Promise<Array<Category>> {
    const categories = await this.repository.find();
    return categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneOrFail({ name });
    return category;
  }
}

export { CategoriesRepository };
