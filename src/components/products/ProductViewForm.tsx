import {observer} from "mobx-react";
import React, {useContext, useEffect} from "react";
import {WebAppContext} from "../../AppContext";
import {Card} from "semantic-ui-react";
import {Trans} from "@lingui/macro";

const ProductViewForm = observer(({uuid}: {uuid: string}) => {
    const {productStore} = useContext(WebAppContext)
    useEffect(() => {
        productStore.fetchProduct(uuid)
    }, [productStore, uuid])

    return <Card>
        <Card.Content>
            <Card.Header><Trans>Product</Trans></Card.Header>
            <Card.Description>{productStore.product?.name}</Card.Description>
        </Card.Content>
    </Card>
})

export default ProductViewForm