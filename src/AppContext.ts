import {AppConfig} from "./AppConfig";
import {getRootStore} from "./stores/RootStore";
import React from "react";

export const rootStore = getRootStore(new AppConfig());

export const WebAppContext = React.createContext(rootStore);