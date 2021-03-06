import { Router, Request, Response } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification/index';

const specificationRoutes = Router();

specificationRoutes.post('/', (request: Request, response: Response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationRoutes };
