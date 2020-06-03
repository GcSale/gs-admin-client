import {Route, Switch} from "react-router";
import HomePage from "../pages/home";
import React from "react";
import ProductsNavigation from "./ProductsNavigation";

const RootNavigation = (): JSX.Element => {
    return <Switch>
        <Route path="/products">
            <ProductsNavigation/>
        </Route>
        <Route path="/">
            <HomePage/>
        </Route>
    </Switch>;
}

export default RootNavigation