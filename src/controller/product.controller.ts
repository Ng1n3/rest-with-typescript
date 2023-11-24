import { Request, Response } from "express";
import {
  CreateProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProudct,
  findProduct,
} from "../service/product.service";
import { string } from "zod";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  //params, payload
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });

    res.send(product);
  } catch (error) {
    res.status(500).send({
      status: "FAILED",
      message: "internal server Error",
    });
  }
}

export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({productId})

  if(!product) {
    return res.sendStatus(400);
  }

  return res.send(product)
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  console.log('productid',productId);
  console.log('userId', userId);
  const update = req.body;
  const product = await findProduct({ productId });
  console.log("product", product)

  if (!product) {
    return res.sendStatus(404);
  }

  
  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProudct({ productId }, update, {
    new: true,
  });
  return res.send(updatedProduct);
}

export async function deleteProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    res.sendStatus(403);
  }

  await deleteProduct({ productId });
  res.sendStatus(200);
}
