/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-30 10:37:09
 * @LastEditTime: 2021-07-30 12:00:33
 */
import React from 'react'
import {
    ZoomInOutlined, ZoomOutOutlined, UndoOutlined, RedoOutlined,
    DeleteOutlined, BoldOutlined, StrikethroughOutlined, ItalicOutlined, UnderlineOutlined
} from '@ant-design/icons'
import { Toolbar } from '@antv/x6-react-components'
const Item = Toolbar.Item
const Group = Toolbar.Group
export default (): JSX.Element => {
    return (
        <Toolbar extra={() => { return <div>右侧组件</div> }}>
            <Group>
                <Item name="zoomIn" tooltip="Zoom In (Cmd +)" icon={<ZoomInOutlined size={45} />} />
                <Item name="zoomOut" tooltip="Zoom Out (Cmd -)" icon={<ZoomOutOutlined size={45}/>} />
            </Group>
            <Group>
                <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined size={45}/>} />
                <Item name="redo" tooltip="Redo (Cmd + Shift + Z)" icon={<RedoOutlined size={45}/>} />
            </Group>
            <Group>
                <Item name="delete" icon={<DeleteOutlined size={45}/>} disabled={true} tooltip="Delete (Delete)" />
            </Group>
            <Group>
                <Item name="bold" icon={<BoldOutlined size={45}/>} active={true} tooltip="Bold (Cmd + B)" />
                <Item name="italic" icon={<ItalicOutlined size={45}/>} tooltip="Italic (Cmd + I)" />
                <Item name="strikethrough" icon={<StrikethroughOutlined size={45}/>} tooltip="Strikethrough (Cmd + Shift + x)" />
                <Item name="underline" icon={<UnderlineOutlined size={45}/>} tooltip="Underline (Cmd + U)" />
            </Group>
        </Toolbar>
    )
}