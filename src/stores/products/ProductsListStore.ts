import {RootStore} from "../RootStore";
import {action, computed, observable} from "mobx";
import {ProductListItem} from "../../models/Product";
import {ProductsApi} from "../../api/ProductsApi";
import {PageInfo} from "../../dtos/CommonDtos";
import {ProductListSearchParams} from "../../dtos/ProductDtos";

class ProductsListStore {
    private rootStore: RootStore;
    private productsApi: ProductsApi;
    private defaultPageSize = 10;

    private readonly pagesAround: number = 2;

    @observable products: ProductListItem[] = []
    @observable pageSize: number = this.defaultPageSize;
    @observable currentPage: number = 0;
    @observable totalPages: number = 1;
    @observable searchName?: string;

    constructor(rootStore: RootStore, productsApi: ProductsApi) {
        this.rootStore = rootStore;
        this.productsApi = productsApi;
    }

    @computed get minPage() {
        return Math.max(0, this.currentPage - this.pagesAround)
    }

    @computed get maxPage() {
        return Math.min(this.totalPages - 1, this.currentPage + this.pagesAround)
    }

    @computed get hasPrevPage() {
        return this.minPage <= 0
    }

    @computed get hasNextPage() {
        return this.maxPage >= this.totalPages - 1
    }

    @computed get pages() {
        const pages: number[] = []
        for (let i = this.minPage; i <= this.maxPage; i++) {
            pages.push(i)
        }
        return pages
    }

    @computed get pageRequest() {
        return {page: this.currentPage, pageSize: this.pageSize, name: this.searchName}
    }

    @action.bound
    updatePageData({name, pageSize, page}: { name?: string, pageSize?: number, page?: number }) {
        this.pageSize = pageSize || this.defaultPageSize
        this.searchName = name || ""
        this.currentPage = (page !== undefined) ? page : 0
    }

    @action.bound
    updateProducts(newProducts: ProductListItem[], pageInfo: PageInfo) {
        this.products = newProducts;
        this.pageSize = pageInfo.pageSize;
        this.totalPages = pageInfo.totalPages
        this.currentPage = pageInfo.pageNumber
    }

    async fetchProducts() {
        try {
            let filter: ProductListSearchParams = {
                pageSize: this.pageSize,
                name: this.searchName,
                page: this.currentPage
            };
            const productsDto = await this.productsApi.getProducts(filter);
            const products = productsDto.items.map(dto => new ProductListItem(dto.name, dto.uuid))
            this.updateProducts(products, productsDto.pageInfo)
        } catch (e) {
            this.rootStore.uiStore.catchError(e)
        }
    }
}

export {ProductsListStore}