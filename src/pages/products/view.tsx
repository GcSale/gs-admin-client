import {observer} from "mobx-react";
import {Button, Confirm} from "semantic-ui-react";
import React, {useContext, useState} from "react";
import {Redirect, useParams} from "react-router";
import ProductViewForm from "../../components/products/ProductViewForm";
import {Link} from "react-router-dom";
import {t, Trans} from "@lingui/macro";
import {WebAppContext} from "../../AppContext";
import {i18n} from "../../App";

const ProductViewPage = observer(() => {
    const {productUuid}: { productUuid: string } = useParams()
    const [redirectToProducts, setRedirectToProducts] = useState(false)
    const {productStore} = useContext(WebAppContext)
    const [confirmDelete, setConfirmDelete] = useState(false);

    async function deleteConfirmed() {
        await productStore.deleteProduct(productUuid);
        setConfirmDelete(false);
        setRedirectToProducts(true);
    }

    return <div>
        <ProductViewForm uuid={productUuid}/>
        <Button positive as={Link} to={`/products/${productUuid}/edit`}><Trans>Edit product</Trans></Button>
        <Button negative onClick={() => {setConfirmDelete(true)}}><Trans>Delete product</Trans></Button>
        <Confirm open={confirmDelete}
                 content={i18n._(t`Are you sure you want to delete this product?`)}
                 confirmButton={i18n._(t`Yes`)}
                 cancelButton={i18n._(t`No`)}
                 onCancel={() => setConfirmDelete(false)}
                 onConfirm={deleteConfirmed}/>
        {redirectToProducts ? <Redirect to="/products"/> : null}
    </div>
})

export default ProductViewPage