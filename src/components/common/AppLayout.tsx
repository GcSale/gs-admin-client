import {observer} from "mobx-react";
import React, {ReactNode, useContext} from "react";
import {WebAppContext} from "../../AppContext";
import HeaderLayout from "./HeaderLayout";
import {Dimmer, Loader} from "semantic-ui-react";
import {ErrorMessage} from "./ErrorMessage";

export const AppLayout = observer(({children}: { children: ReactNode }) => {
    const {uiStore} = useContext(WebAppContext);
    return <div>
        <HeaderLayout/>
        <ErrorMessage/>
        <Dimmer active={uiStore.isLoading} inverted>
            <Loader size='large'>Loading</Loader>
        </Dimmer>
        {children}
    </div>
})