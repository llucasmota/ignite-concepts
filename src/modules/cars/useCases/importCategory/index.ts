import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export default (): ImportCategoryController => {
  const categogoryRepository = new CategoriesRepository();

  const importCategoryUseCase = new ImportCategoryUseCase(categogoryRepository);

  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
  );
  return importCategoryController;
};
