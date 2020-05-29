import {ProductsListStore} from "./products/ProductsListStore";
import {AppConfig} from "../AppConfig";
import {ProductsApi} from "../api/ProductsApi";
import {ProductStore} from "./products/ProductStore";
import {UiStore} from "./products/UiStore";

export class RootStore {
    productsListStore: ProductsListStore;
    productStore: ProductStore;
    uiStore: UiStore;

    constructor(appConfig: AppConfig) {
        const productsApi = new ProductsApi(appConfig.productServiceUrl);
        this.productsListStore = new ProductsListStore(this, productsApi);
        this.productStore = new ProductStore(this, productsApi)
        this.uiStore = new UiStore(this)
    }

}

export function getRootStore(appConfig: AppConfig): RootStore {
    return new RootStore(appConfig);
}