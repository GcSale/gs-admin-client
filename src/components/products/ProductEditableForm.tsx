import {observer} from "mobx-react";
import {Button, Form} from "semantic-ui-react";
import React from "react";
import {Product} from "../../models/Product";
import {Trans} from "@lingui/macro";

const ProductEditableForm = observer(({product, onSaveProduct}: { product: Product | undefined, onSaveProduct: () => void }) => {
    if (!product) {
        return <div><Trans>Product not found</Trans></div>
    }

    function saveProduct() {
        onSaveProduct()
    }

    return <Form>
        <Form.Field inline>
            <Form.Input label={<Trans>Product name</Trans>} placeholder='Product name' value={product.name} onChange={e => {
                product.name = e.target.value
            }}/>
        </Form.Field>
        <Button type="submit" onClick={saveProduct}><Trans>Save product</Trans></Button>
    </Form>
})

export default ProductEditableForm