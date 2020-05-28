import {ProductInfoDto, ProductListItemDto, ProductListSearchParams, ProductSaveDto} from "../dtos/ProductDtos";
import fetch from 'isomorphic-unfetch';
import retryFetch from "fetch-retry";
import {assertOkResponse} from "../utils/http";
import {Page} from "../dtos/CommonDtos";

const rFetch = retryFetch(fetch);

export class ProductsApi {
    private readonly serverUrl: string;

    constructor(serverUrl: string) {
        this.serverUrl = serverUrl;
    }

    async getProduct(uuid: string): Promise<ProductInfoDto> {
        const response = await rFetch(`${this.serverUrl}/products/${uuid}`, {
            method: 'GET',
        });
        await assertOkResponse(response);

        return await response.json();
    }

    async saveProduct(uuid: string, dto: ProductSaveDto): Promise<void> {
        const response = await rFetch(`${this.serverUrl}/products/${uuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dto)
        });
        await assertOkResponse(response);
    }

    async deleteProduct(uuid: string): Promise<void> {
        const response = await rFetch(`${this.serverUrl}/products/${uuid}`, {
            method: 'DELETE'
        });
        await assertOkResponse(response);
    }

    async getProducts(filter: ProductListSearchParams): Promise<Page<ProductListItemDto>> {
        let url = new URL(`${this.serverUrl}/products/`);
        url.searchParams.append("page", filter.page.toString());
        url.searchParams.append("pageSize", filter.pageSize.toString());
        if (filter.name) {
            url.searchParams.append("name", filter.name);
        }
        const response = await rFetch(url.toString(), {
            method: 'GET',
        });
        await assertOkResponse(response);

        return await response.json()
    }
}