import {observer} from "mobx-react";
import ProductEditableForm from "../../components/products/ProductEditableForm";
import React, {useContext, useEffect, useState} from "react";
import {WebAppContext} from "../../AppContext";
import {Redirect, useParams} from "react-router";

const ProductEditPage = observer(() => {
    const {productUuid}: { productUuid: string } = useParams()
    const {productStore} = useContext(WebAppContext)
    const [redirectToProductView, setRedirectToProductView] = useState(false)
    useEffect(() => {
        productStore.fetchProduct(productUuid)
    }, [productStore, productUuid])

    async function saveProduct() {
        await productStore.saveProduct()
        setRedirectToProductView(true)
    }

    return <>
        <ProductEditableForm product={productStore.product} onSaveProduct={saveProduct}/>
        {redirectToProductView ? <Redirect to={`/products/${productUuid}`}/> : null}
        </>
})

export default ProductEditPage