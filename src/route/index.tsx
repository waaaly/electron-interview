/*
 * @Description:项目路由
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-19 10:52:39
 * @LastEditTime: 2021-08-10 17:55:03
 */
import React from 'react';
import { Menu } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Loggin from '../view/loggin';
import Table from '../view/table';
import DataBase from '../view/database';
import Antdx6 from '../view/antdx6';
import Antdg6 from '../view/antdg6';
import Drag from '../view/drag';
import Alipay from '../view/alipay';

function Base() {
    return (
        <Menu mode="horizontal">
            <Menu.Item key={1}>
                <Link to="/login">登录</Link>
            </Menu.Item>
            <Menu.Item key={2}>
                <Link to="/table">表格</Link>
            </Menu.Item>
            <Menu.Item key={3}>
                <Link to="/db">数据库</Link>
            </Menu.Item>
            <Menu.Item key={4}>
                <Link to="/x6">Antdx6</Link>
            </Menu.Item>
            <Menu.Item key={5}>
                <Link to="/g6">Antdg6</Link>
            </Menu.Item>
            <Menu.Item key={6}>
                <Link to="/drag">drag</Link>
            </Menu.Item>
            <Menu.Item key={7}>
                <Link to="/alipay">alipay</Link>
            </Menu.Item>
        </Menu>
    );
}

export default () => {
    return (
        <Router basename="/">
            <Base />
            <Route exact path="/login" component={Loggin} />
            <Route exact path="/table" component={Table} />
            <Route exact path="/db" component={DataBase} />
            <Route exact path="/x6" component={Antdx6} />
            <Route exact path="/g6" component={Antdg6} />
            <Route exact path="/drag" component={Drag} />
            <Route exact path="/alipay" component={Alipay} />
        </Router>
    );
};
