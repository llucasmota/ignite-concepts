import { injectable, inject } from 'tsyringe';

import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('CategoriesRepository')
    private specificationRepository: ISpecificationRepository
  ) { }
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationRepository.findByName(
      name
    );
    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }
    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
