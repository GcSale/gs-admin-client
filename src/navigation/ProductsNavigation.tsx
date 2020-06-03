import {Route, Switch, useRouteMatch} from "react-router";
import React from "react";
import ProductsListPage from "../pages/products/list";
import ProductViewPage from "../pages/products/view";
import ProductNewPage from "../pages/products/new";
import ProductEditPage from "../pages/products/edit";

const ProductsNavigation = (): JSX.Element => {
    const match = useRouteMatch();
    return <Switch>
        <Route path={`${match.url}/new`}>
            <ProductNewPage/>
        </Route>
        <Route path={`${match.url}/:productUuid/edit`}>
            <ProductEditPage/>
        </Route>
        <Route path={`${match.url}/:productUuid`}>
            <ProductViewPage/>
        </Route>
        <Route path={`${match.url}/`}>
            <ProductsListPage/>
        </Route>
    </Switch>;
}

export default ProductsNavigation