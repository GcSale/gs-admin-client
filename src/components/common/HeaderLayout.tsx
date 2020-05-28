import {observer} from "mobx-react";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Dropdown, Menu} from "semantic-ui-react";
import {Trans} from "@lingui/macro";
import {WebAppContext} from "../../AppContext";

const HeaderLayout = observer(() => {
    const {uiStore} =useContext(WebAppContext)
    return <Menu >
            <Menu.Item header><Link to="/"><Trans>Home</Trans></Link></Menu.Item>
            <Menu.Item header><Link to="/products"><Trans>Products</Trans></Link></Menu.Item>
            <Menu.Item position="right">
                <Dropdown text={uiStore.currentLanguage}>
                    <Dropdown.Menu>
                        <Dropdown.Item value='en' onClick={() => uiStore.useLanguage('en')}>en</Dropdown.Item>
                        <Dropdown.Item value='ru' onClick={() => uiStore.useLanguage('ru')}>ru</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
    </Menu>
})

export default HeaderLayout