import { Request, Response } from 'express';

import ListCategoriesUseCase from './ListCategoriesUseCase';

export default class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }
  async handle(request: Request, response: Response): Promise<Response> {
    const all = await this.listCategoriesUseCase.execute();
    return response.json(all);
  }
}
