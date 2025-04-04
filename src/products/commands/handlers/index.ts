import { CreateProductHandler } from "./create-product.handler";
import { RemoveProductHandler } from "./remove-product.handler";
import { UpdateProductHandler } from "./update-product.handler";

export const commandHandlers = [
    CreateProductHandler,
    UpdateProductHandler,
    RemoveProductHandler
]