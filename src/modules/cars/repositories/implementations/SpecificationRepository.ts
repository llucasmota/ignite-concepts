/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuidV4 } from 'uuid';

import Specification from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];
  private static INSTANCE: SpecificationsRepository;
  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      id: uuidV4(),
      name,
      description,
      created_at: new Date(),
    });
    this.specifications.push(specification);
  }

  findByName(name: string): Specification | null {
    const specExists = this.specifications.find((spec) => spec.name === name);
    return specExists || null;
  }
}

export { SpecificationsRepository };
