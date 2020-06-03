import {ProductsListStore} from "./products/ProductsListStore";
import {ProductsApi} from "../api/ProductsApi";
import {ProductStore} from "./products/ProductStore";
import {UiStore} from "./products/UiStore";

export class RootStore {
    productsListStore: ProductsListStore;
    productStore: ProductStore;
    uiStore: UiStore;

    constructor() {
        const productsApi = new ProductsApi();
        this.productsListStore = new ProductsListStore(this, productsApi);
        this.productStore = new ProductStore(this, productsApi)
        this.uiStore = new UiStore(this)
    }

}

export function getRootStore(): RootStore {
    return new RootStore();
}