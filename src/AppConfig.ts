declare global {
    interface Window {
        APP_CONFIG: any;
    }
}

export class AppConfig {
    get productServiceUrl(): string {
        return this._productServiceUrl || "";
    }

    private readonly _productServiceUrl = window.APP_CONFIG.PRODUCTS_SERVICE_URL;
}