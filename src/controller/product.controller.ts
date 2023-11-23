import { Request, Response } from "express";
import { CreateProductInput, ReadProductInput, UpdateProductInput } from "../schema/product.schema";

export async function createProductHandler (req: Request<{}, {}, CreateProductInput['body']>, res: Response) { //params, payload

}
export async function updateProductHandler (req: Request<UpdateProductInput['params']>, res: Response) {

}
export async function getProductHandler (req: Request<ReadProductInput['params']>, res: Response) {

}
export async function deleteProductHandler (req: Request<ReadProductInput['params']>, res: Response) {

}