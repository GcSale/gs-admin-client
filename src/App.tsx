import React from 'react';
import './App.css';
import {WebAppContext} from "./AppContext";
import {getRootStore} from "./stores/RootStore";
import {setupI18n} from "@lingui/core";
import {catalogs} from "./utils/locales";
import {AppRoot} from "./components/common/AppRoot";

export const i18n = setupI18n({catalogs: catalogs})

function App(): JSX.Element {
    const rootStore = getRootStore();
    return <WebAppContext.Provider value={rootStore}>
        <AppRoot/>
    </WebAppContext.Provider>
}

export default App;
