import {getRootStore} from "./stores/RootStore";
import React from "react";

export const rootStore = getRootStore();

export const WebAppContext = React.createContext(rootStore);