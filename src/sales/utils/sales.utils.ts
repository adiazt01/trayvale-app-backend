import { NotFoundException } from "@nestjs/common";
import { CreateSaleDto } from "../dto/create-sale.dto";
import { Product } from "@/products/entities/product.entity";

/**
 * Calculates the prices for each sale item in the sale and updates the payment amount.
 * @param createSaleDto The sale data transfer object containing sale items and payment information.
 * @param productsFound An array of products found in the database.
 */
export function calculateSalePrices(createSaleDto: CreateSaleDto, productsFound: Product[]): void {
    createSaleDto.saleItems.forEach((saleItem) => {
        const product = productsFound.find((product) => product.id === saleItem.productId);
        if (product) {
            saleItem.price = product.price;
            saleItem.totalPrice = product.price * saleItem.quantity;
        } else {
            throw new NotFoundException(
                `Product with ID ${saleItem.productId} not found in the database.`,)
        }
    });
}