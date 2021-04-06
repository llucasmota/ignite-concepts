import { Router, Request, Response } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { CreateSpecificationServices } from '../modules/cars/services/CreateSpecificationServices';

const specificationRepository = new SpecificationsRepository();

const specificationRoutes = Router();

specificationRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createSpecificationServices = new CreateSpecificationServices(
    specificationRepository
  );

  createSpecificationServices.execute({ name, description });

  return response.status(201).send();
});

export { specificationRoutes };
