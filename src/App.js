import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Delete, Resource, fetchUtils, simpleRestClient } from 'admin-on-rest';

import './App.css';

import authClient from './authClient';
import sagas from './sagas';
import themeReducer from './themeReducer';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
import DeviceIcon from 'material-ui/svg-icons/device/devices';
import customRoutes from './routes';
import translations from './i18n';

import {DeviceList, DeviceEdit, DeviceCreate} from './device';
import {UserList, UserEdit, UserCreate} from './user';

import {SyslogList} from './syslog';

class App extends Component {


    render() {

        const httpClient = (url, options = {}) => {
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            const token = localStorage.getItem('token');
            options.headers.set('Authorization', `Bearer ${token}`);
            return fetchUtils.fetchJson(url, options);
        }

        const restClient1 = simpleRestClient('http://ec2-54-218-74-131.us-west-2.compute.amazonaws.com:32768/cmad_app/v2', httpClient);

        return (
            <Admin
                title="CMAD Sandboxers"
                restClient={restClient1}
                customReducers={{ theme: themeReducer }}
                customRoutes={customRoutes}
                authClient={authClient}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                messages={translations}
               
            >

             <Resource name="syslog" list={SyslogList} />
             <Resource name="device" list={DeviceList} edit={DeviceEdit} create={DeviceCreate} remove={Delete} icon={DeviceIcon} />
             <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />

            </Admin>
        );
    }
}

export default App;
