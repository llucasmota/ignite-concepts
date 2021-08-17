import { inject, injectable } from 'tsyringe';
import 'reflect-metadata';

import { AppError } from '../../../../errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICatetoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );
    console.log('categoria já existe', categoryAlreadyExists);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
