import React from 'react';
import './App.css';
import {AppConfig} from "./AppConfig";
import {WebAppContext} from "./AppContext";
import {getRootStore} from "./stores/RootStore";
import {setupI18n} from "@lingui/core";
import {catalogs} from "./utils/locales";
import {AppRoot} from "./components/common/AppRoot";

export const i18n = setupI18n({catalogs: catalogs})

function App() {
    const appConfig = new AppConfig()

    let rootStore = getRootStore(appConfig);
    return (
        <WebAppContext.Provider value={rootStore}>
            <AppRoot/>
        </WebAppContext.Provider>
    );
}

export default App;
