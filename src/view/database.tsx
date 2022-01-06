/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-28 14:12:15
 * @LastEditTime: 2021-07-29 09:59:09
 */
import React, { useState } from 'react'
import Mysql from 'mysql'
import { message, Form, Input, InputNumber, Button, Select } from 'antd'
const config = {
    host: '192.168.94.216',
    user: 'root',
    password: 'mysql5426986',
    database: 'test',
    port: 3306
}
export default () => {
    var conn = Mysql.createConnection(config);
    const insertSql = 'insert into product_pack_price_col(id,type,row_id,row_span,col_span,data,style,class_name) VALUES(?,?,?,?,?,?,?,?)'
    const [insertValue, setInsertValue] = useState([1, 'td', 1, null, null, '产品价格', null, null])
    conn.connect((err, args) => {
        if (!err) {
            message.success('数据库连接成功！')
            console.log(args)
        } else {
            message.error('数据连接失败！')
            console.log(args)
        }
    })
    function onFinish() {
        console.log(insertValue)
        conn.query(insertSql, insertValue, (err, res, fields) => {
            console.log(err, res, fields)
            if (err) {
                message.error('数据插入失败！')
            } else {
                message.success('数据插入成功！')
            }
        })

    }
    function onClickQuery() {
        conn.query(`select 
        concat('[',
                group_concat(json_object(
                        'id',id,
                        'type',type,
                        'rowId',row_id,
                        'rowSpan',row_span,
                        'colSpan',col_span,
                        'data',data,
                        'style',style,
                        'className',class_name)),']') as data from product_pack_price_col`, (err, res) => {
            console.log(err)
            if (!err) {
                console.log(res)
            }
        })
    }
    return (
        <div>
            <Button onClick={onClickQuery}>查询</Button>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item label="id" name="id" >
                    <InputNumber onChange={(value: number | string | null) => { let temp = insertValue; temp[0] = value; setInsertValue(temp) }} />
                </Form.Item>

                <Form.Item label="type" name="type" >
                    <Select onChange={(value: any) => { let temp = insertValue; temp[1] = value; setInsertValue(temp) }} allowClear>
                        <Select.Option value="th">th</Select.Option>
                        <Select.Option value="td">td</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="row_id" name="row_id" >
                    <Input onChange={(e: any) => { let temp = insertValue; temp[2] = e.target.value; setInsertValue(temp) }} />
                </Form.Item>
                <Form.Item label="col_span" name="col_span" >
                    <Input onChange={(e: any) => { let temp = insertValue; temp[3] = e.target.value; setInsertValue(temp) }} />
                </Form.Item>
                <Form.Item label="row_span" name="row_span" >
                    <Input onChange={(e: any) => { let temp = insertValue; temp[4] = e.target.value; setInsertValue(temp) }} />
                </Form.Item>
                <Form.Item label="data" name="data" >
                    <Input onChange={(e: any) => { let temp = insertValue; temp[5] = e.target.value; setInsertValue(temp) }} />
                </Form.Item>
                <Form.Item label="style" name="style" >
                    <Input onChange={(e: any) => { let temp = insertValue; temp[6] = e.target.value; setInsertValue(temp) }} />
                </Form.Item>
                <Form.Item label="class_name" name="class_name" >
                    <Input onChange={(e: any) => { let temp = insertValue; temp[7] = e.target.value; setInsertValue(temp) }} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        添加数据
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}