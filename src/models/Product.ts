import {v4 as uuid4} from 'uuid';
import {ProductInfoDto} from "../dtos/ProductDtos";
import {observable} from "mobx";

class Product {
    @observable uuid: string
    @observable name: string

    private constructor(uuid: string, name = "") {
        this.uuid = uuid
        this.name = name
    }

    static CreateNew(): Product {
        return new Product(uuid4());
    }

    static FromDto(dto: ProductInfoDto): Product {
        return new Product(dto.uuid, dto.name);
    }
}

class ProductListItem {
    @observable uuid: string
    @observable name: string

    constructor(name: string, uuid: string) {
        this.name = name;
        this.uuid = uuid;
    }
}

export {Product, ProductListItem}