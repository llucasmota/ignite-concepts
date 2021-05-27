import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICatetoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';

/**
 * 1 - deve ser passada a interface do repo
 * 2 - deve ser dado um nome a esse registro
 * 3 - Deve ser passado como segundo parâmetro a classe de destino
 */
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);
