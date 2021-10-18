import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/InMemoryCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe('Create Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Categoria de teste',
      description: 'Descrição de categoria de teste',
    };

    await createCategoryUseCase.execute(category);

    const findCategoryByName = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(findCategoryByName).toHaveProperty('id');
  });
  it('Should be not able to create to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Categoria de teste 123',
        description: 'Descrição de categoria de teste 123',
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
