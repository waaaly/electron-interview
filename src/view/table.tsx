/*
 * @Description:
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-28 13:45:45
 * @LastEditTime: 2021-08-03 14:43:05
 */
import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import Mysql from 'mysql';
import { TableData } from '../mock/tableData';
import '../App.global.css';

const config = {
    host: '192.168.94.216',
    user: 'root',
    password: 'mysql5426986',
    database: 'test',
    port: 3306,
};
const sql = Mysql.createConnection(config);
export default () => {
    const [tableData, setTableData] = useState({ row: [] });

    function onClickRefresh() {
        sql.query(
            'select r.id, r.class_name as className from product_pack_price_row r',
            (err, row) => {
                if (!err) {
                    console.log(row);
                    sql.query(
                        `select r.id,  r.type , r.data , 
                r.row_id as rowId,r.row_span as rowSpan,r.col_span as colSpan, r.class_name as className 
                from product_pack_price_col  r`,
                        (err, col) => {
                            if (!err) {
                                let data = { row };
                                data.row.forEach((el: any) => {
                                    el.col = col.filter((item: any) => {
                                        return el.id === item.rowId;
                                    });
                                });
                                console.log(data);
                                setTableData(data);
                            }
                        }
                    );
                }
            }
        );
    }

    useEffect(() => {
        sql.connect((err, args) => {
            if (!err) {
                console.log(args);
                message.success('连接成功！');
            } else {
                console.log(err);
            }
        });
        return () => {
            sql.end();
        };
    }, []);

    return (
        <div>
            <Button onClick={onClickRefresh}>刷新数据</Button>
            <table
                draggable="true"
                cellPadding="10"
                border="2"
                style={{
                    margin: '20px',
                    textAlign: 'center',
                    color: '#fff',
                    borderColor: '#000',
                }}
            >
                {tableData.row.map((tr: any) => {
                    return (
                        <tr
                            key={tr.id}
                            className={tr.className ? tr.className : ''}
                        >
                            {tr.col.map((tc: any) => {
                                        if (tc.type === 'th') {
                                            return (
                                                <th key={tc.id} rowSpan={tc.rowSpan} colSpan={tc.colSpan}  className={tc.className ? tc.className : ''}>{tc.data}</th>
                                            )
                                        } 
                                            return (
                                                <td  key={tc.id} rowSpan={tc.rowSpan} colSpan={tc.colSpan}  className={tc.className ? tc.className : ''}>{tc.data}</td>
                                            )
                                        
                                    })
                                }
                            })}
                        </tr>
                    );
                })}
                <tr className="bg_242c38">
                    <td colSpan={2} className="bg_000C14 color_61A3FF pointer">
                        返回上一步
                    </td>
                    <td colSpan={1} className="bg_1B222D color_61A3FF pointer">
                        立即使用
                    </td>
                    <td colSpan={1} className="bg_1B222D color_61A3FF pointer">
                        立即购买
                    </td>
                    <td colSpan={1} className="bg_61A3FF pointer">
                        立即购买
                    </td>
                    <td colSpan={1} className="bg_1B222D color_61A3FF pointer">
                        立即购买
                    </td>
                    <td colSpan={2} className="bg_000C14 ">
                        &nbsp;
                    </td>
                </tr>
            </table>
            {/* <table cellPadding="10" border="2" style={{ margin: '20px', textAlign: 'center', color: '#fff', borderColor: '#000' }}>
                <tr>
                    <th style={{ background: '#3A414F' }} rowSpan={2} colSpan={2}>产品套餐</th>
                    <th style={{ background: '#61A3FF' }} rowSpan={1}>免费试用</th>
                    <th style={{ background: '#448EF7' }} rowSpan={1}>半年套餐</th>
                    <th style={{ background: '#6FD1CD' }} className="table-hot-tag" rowSpan={1}>一年套餐</th>
                    <th style={{ background: '#72DEC3' }} rowSpan={1}>三年套餐</th>
                    <th style={{ background: '#3A414F' }} rowSpan={2}>升级说明</th>
                </tr>
                <tr>
                    <th style={{ background: '#61A3FF' }} >0/月</th>
                    <th style={{ background: '#448EF7' }} >123/月</th>
                    <th style={{ background: '#6FD1CD' }} >456/月</th>
                    <th style={{ background: '#72DEC3' }}>678/月</th>
                </tr>

                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ background: '#3A414F' }} rowSpan={4}>授权信息</th>
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>使用年限</th>
                    <td rowSpan={1}>1个月</td>
                    <td rowSpan={1}>6个月</td>
                    <td rowSpan={1}>12个月</td>
                    <td rowSpan={1}>36个月</td>
                    <td rowSpan={1}>可续期</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>折合每月</th>
                    <td rowSpan={1}>0</td>
                    <td rowSpan={1}>12</td>
                    <td rowSpan={1}>34</td>
                    <td rowSpan={1}>56</td>
                    <td rowSpan={1}>&nbsp;</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>赠送又会</th>
                    <td rowSpan={1}>无</td>
                    <td rowSpan={1}>1</td>
                    <td rowSpan={1}>3</td>
                    <td rowSpan={1}>6</td>
                    <td rowSpan={1}>&nbsp;</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>用户授权数量</th>
                    <td rowSpan={1} colSpan={5} >不限</td>
                </tr>

                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ background: '#3A414F' }} rowSpan={4}>数据存储</th>
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>网络流量</th>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1} >不限</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>MySQL独享</th>
                    <td rowSpan={1}>50M</td>
                    <td rowSpan={1}>100M</td>
                    <td rowSpan={1}>300M</td>
                    <td rowSpan={1}>500M</td>
                    <td rowSpan={1}>可升级</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>MongoDB独享</th>
                    <td rowSpan={1}>50M</td>
                    <td rowSpan={1}>100M</td>
                    <td rowSpan={1}>300M</td>
                    <td rowSpan={1}>500M</td>
                    <td rowSpan={1}>可升级</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>Redis缓存</th>
                    <td rowSpan={1} colSpan={5} >无</td>
                </tr>

                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ background: '#3A414F' }} rowSpan={4}>应用服务</th>
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>应用部署服务</th>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1} >按需购买授权</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>应用升级服务</th>
                    <td rowSpan={1} colSpan={5} >免费</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>智能合约服务</th>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1} >按使用量付费</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>帮助中心服务</th>
                    <td rowSpan={1} colSpan={5} >免费</td>
                </tr>

                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ background: '#3A414F' }} rowSpan={4}>其他服务</th>
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>迁移部署服务</th>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1} >按次数收费</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>数据恢复服务</th>
                    <td rowSpan={1} colSpan={5} >按次数收费</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-single-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>数据备份服务</th>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1} >免费</td>
                    <td rowSpan={1}>&nbsp;</td>
                    <td rowSpan={1}>&nbsp;</td>
                </tr>
                <tr style={{ background: '#242C38' }} className="table-double-tr">
                    <th style={{ color: ' #5F6878' }} rowSpan={1}>应用培训服务</th>
                    <td rowSpan={1} colSpan={5} >按次数收费</td>
                </tr>
            </table> */}
        </div>
    );
};
