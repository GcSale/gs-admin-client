import {RootStore} from "../RootStore";
import {action, computed, observable} from "mobx";

export class UiStore {
    private rootStore: RootStore;

    @observable loadingsCount = 0;
    @observable errorMessage = "";
    @observable currentLanguage = "en";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @computed get isLoading(): boolean {
        return this.loadingsCount > 0;
    }

    @computed get hasErrorMessage(): boolean {
        return this.errorMessage != null && this.errorMessage.length > 0;
    }

    @action.bound showLoading(): void {
        this.loadingsCount += 1;
    }

    @action.bound hideLoading(): void {
        this.loadingsCount -= 1;
    }

    @action.bound useLanguage(code: string): void {
        this.currentLanguage = code
    }

    @action.bound catchError(err: Error): void {
        // if (typeof window !== 'undefined') {
        //     if (err.message == "Unauthorized") {
        //         Router.push("/login");
        //         return
        //     }
        // }
        this.errorMessage = err.toString();
        console.error(err);
    }

    @action.bound hideError(): void {
        this.errorMessage = "";
    }
}