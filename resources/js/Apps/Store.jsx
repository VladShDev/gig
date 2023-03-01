import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, HashRouter} from "react-router-dom";
import Stores from "@/Apps/Store/Top/Stores";
import StorePages from "@/Apps/Store/Page/Stores";
import Settings from "@/Apps/Store/Page/Settings";
import {Head} from "@inertiajs/inertia-react";
import Roles from "@/Apps/Store/Page/Users/Roles";
import Permissions from "@/Components/Acl/Permissions";
import UsersList from "@/Apps/Store/Page/Users/List";
import OrderGridExample from "@/Apps/Store/Page/OrderGridExample";

function Menu(props) {

}

function Google(props) {
    console.log('GOOGLE');
    return <div>GooglE</div>
}

function Yandex(props) {
    console.log('Yandex');
    return <div>UYandex</div>
}

export default function (props) {

    const [locationHash, setLocationHash] = useState(document.location.hash);

    window.store = props.store;

    useEffect(() => {
        window.addEventListener("hashchange", () => {
            setLocationHash(document.location.hash);
        }, false);
    }, []);

    const isMenuActive = (menu) => {
        return locationHash.indexOf(menu.props.url) >= 0
    }

    const menu = [
        <Menu url={'/'} title={'Dashboard'} permission={'store'}><Google {...props}/></Menu>,
        <Menu url={'/orders'} title={'Orders'} permission={'products'} menu={[
            <Menu url={'/orders/all'} title={'All Orders'} permission={'orders'}><Google {...props}/></Menu>,
            <Menu url={'/orders/local-delivery'} title={'Local Delivery'}
                  permission={'orders'}><Google {...props}/></Menu>,
            <Menu url={'/orders/shipping'} title={'Shipping'} permission={'orders'}><Google {...props}/></Menu>,
            <Menu url={'/orders/store-pickup'} title={'In-Store Pickup'}
                  permission={'orders'}><Google {...props}/></Menu>
        ]}>
            <OrderGridExample {...props}/>
        </Menu>,
        <Menu url={'/products'} title={'Products'} permission={'products'}><Google {...props}/></Menu>,
        <Menu url={'/locations'} title={'Locations'} permission={'products'}><Google {...props}/></Menu>,
        <Menu url={'/order/rules'} title={'Order Routing'} permission={'order/rules'}><Google {...props}/></Menu>,
        <Menu url={'/integrations'} title={'Integrations'} permission={'order/rules'}><UsersList {...props}/></Menu>,
        <Menu url={'/users'} title={'Users'} permission={'users'}
              menu={[
                  <Menu url={'/users/list'} title={'List'} permission={'users/roles'}><UsersList {...props}/></Menu>,
                  <Menu url={'/users-roles'} title={'Roles'} permission={'users/roles'}><Roles {...props}/></Menu>,
              ]}
        ><Google {...props}/></Menu>,

        /**
         * This is settings Menu
         * build based configuration of settings and permissions
         */
        <Menu url={'/settings'} title={'Settings'} permission={'settings'} menu={
            props.settings.configuration.map(configuration => {
                return <Menu url={'/settings/' + configuration.id} title={configuration.name}
                             permission={configuration.permission}>
                    <Settings {...props} configuration={configuration} values={props.settings.values}/>
                </Menu>
            })
        }>
            <div>menu</div>
        </Menu>,


        <Menu url={'/settings2'} title={'Settings2'} permission={'settings'}><Settings {...props}/></Menu>,
        <Menu url={'/events'} title={'Events'} permission={'events'}><Google {...props}/></Menu>,
        <Menu url={'/notifications'} title={'Notifications'} permission={'notifications'}><Google {...props}/></Menu>,
        <Menu url={'/tags'} title={'Tags'} permission={'tags'}><Google {...props}/></Menu>,
    ];

    return <div id={'store'}>

        <Head title={'Dashboard'}/>

        <div id={'left-panel'}>
            <div id="navigation">
                <ul>
                    {menu.map((menu, index) => {
                        return <li className={isMenuActive(menu) ? 'active' : null}><a
                            href={"#" + menu.props.url}>{menu.props.title}</a>
                            {menu.props.menu ? <ul>
                                {menu.props.menu.map((submenu, i) => {
                                    return <li className={isMenuActive(submenu) ? 'active' : null}><a
                                        href={"#" + submenu.props.url}>{submenu.props.title}</a></li>
                                })}
                            </ul> : null}
                        </li>
                    })}
                </ul>
            </div>
        </div>
        <div id={'right-panel'}>
            <div id={'top-panel'}>
                <Stores stores={props.stores} current={props.current_store_hash}/>
                <div>{props.user.name}
                    <a href={'/logout'}>Logout</a>
                </div>

            </div>
            <main>
                <HashRouter>
                    <Routes>
                        {menu.map((menu, index) => {
                            return <Route path={menu.props.url} element={menu.props.children}/>
                        })}
                        {menu.map((parentMenu, index) => {
                            if (parentMenu.props.menu)
                                return parentMenu.props.menu.map(menu => <Route path={menu.props.url}
                                                                                element={menu.props.children}/>)
                        })}
                        <Route path={"/stores"} element={<StorePages/>}/>
                        <Route path="/stores" element={<StorePages/>}>
                            <Route path=":id" element={<StorePages edit={true}/>}/>
                        </Route>

                    </Routes>
                </HashRouter>

            </main>
        </div>

    </div>;
}