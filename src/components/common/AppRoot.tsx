import {observer} from "mobx-react";
import {AppLayout} from "./AppLayout";
import RootNavigation from "../../navigation/RootNavigation";
import {I18nProvider} from "@lingui/react";
import React, {useContext} from "react";
import {i18n} from "../../App";
import {WebAppContext} from "../../AppContext";

export const AppRoot = observer(() => {
    const rootStore = useContext(WebAppContext)

    return <I18nProvider i18n={i18n} language={rootStore.uiStore.currentLanguage}>
        <AppLayout>
            <RootNavigation/>
        </AppLayout>
    </I18nProvider>
})