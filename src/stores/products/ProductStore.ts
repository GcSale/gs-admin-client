import {RootStore} from "../RootStore";
import {action, observable} from "mobx";
import {Product} from "../../models/Product";
import {ProductsApi} from "../../api/ProductsApi";
import {ProductSaveDto} from "../../dtos/ProductDtos";

class ProductStore {
    private rootStore: RootStore;
    private productsApi: ProductsApi;

    @observable product?: Product

    constructor(rootStore: RootStore, productsApi: ProductsApi) {
        this.rootStore = rootStore;
        this.productsApi = productsApi;
    }

    newProduct() {
        this.updateProduct(Product.CreateNew())
    }

    @action.bound
    updateProduct(product: Product) {
        this.product = product;
    }

    async fetchProduct(uuid: string) {
        try {
            const productDto = await this.productsApi.getProduct(uuid)
            this.updateProduct(Product.FromDto(productDto))
        } catch (e) {
            this.rootStore.uiStore.catchError(e)
        }
    }

    async saveProduct() {
        if (!this.product) {
            return
        }
        try {
            const saveDto: ProductSaveDto = {name: this.product.name}
            await this.productsApi.saveProduct(this.product.uuid, saveDto)
            await this.fetchProduct(this.product.uuid)
        } catch (e) {
            this.rootStore.uiStore.catchError(e)
        }
    }

    async deleteProduct(productUuid: string) {
        try {
            await this.productsApi.deleteProduct(productUuid)
        } catch (e) {
            this.rootStore.uiStore.catchError(e)
        }
    }
}

export {ProductStore}