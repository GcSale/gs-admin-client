import {observer} from "mobx-react";
import ProductEditableForm from "../../components/products/ProductEditableForm";
import React, {useContext, useEffect, useState} from "react";
import {WebAppContext} from "../../AppContext";
import {Redirect} from "react-router";

const ProductNewPage = observer(() => {
    const {productStore} = useContext(WebAppContext)
    const [redirectToProducts, setRedirectToProducts] = useState(false)
    useEffect(() => {
        productStore.newProduct()
    }, [productStore])

    async function saveProduct() {
        await productStore.saveProduct()
        setRedirectToProducts(true)
    }

    return <>
        <ProductEditableForm product={productStore.product} onSaveProduct={saveProduct}/>
        {redirectToProducts ? <Redirect to="/products"/> : null}
        </>
})

export default ProductNewPage