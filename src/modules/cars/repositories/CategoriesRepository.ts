import { v4 as uuidV4 } from "uuid";

import Category from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICatetoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();
    Object.assign(category, {
      id: uuidV4(),
      name,
      description,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      created_at: new Date(),
    });

    this.categories.push(category);
  }
  list(): Category[] {
    return this.categories;
  }
  findByName(name: string): Category | null {
    const category = this.categories.find((category) => category.name === name);
    return category || null;
  }
}

export { CategoriesRepository };
