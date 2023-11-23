import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import productModel, {
  ProductDocument,
  ProductInput,
} from "../models/product.model";

export async function createProduct(input: ProductInput) {
  return productModel.create(input);
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return productModel.findOne(query, {}, options);
}

export async function findAndUpdateProudct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return productModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return productModel.deleteOne(query);
}
