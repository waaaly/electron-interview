/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-29 15:07:13
 * @LastEditTime: 2021-07-30 14:21:26
 */
import React, { useEffect } from 'react'
import { Graph, Shape } from "@antv/x6";
import { SplitBox } from '@antv/x6-react-components';
import { Button } from 'antd';
import TopToolBar from '../components/toolBar'


const data = {
    // 节点
    nodes: [
        {
            id: 'node1', // String，可选，节点的唯一标识
            x: 40,       // Number，必选，节点位置的 x 值
            y: 40,       // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            label: 'hello', // String，节点标签
        },
        {
            id: 'node2', // String，节点的唯一标识
            x: 160,      // Number，必选，节点位置的 x 值
            y: 180,      // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            label: 'world', // String，节点标签
        },
    ],
    // 边
    edges: [
        {
            source: 'node1', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
        },
    ],
};
export default () => {
    var graph: Graph;
    useEffect(() => {
        graph = new Graph({
            container: document.getElementById('container'),
            autoResize:true,
            background: {
                color: '#fffbe6', // 设置画布背景颜色
            },
            grid: {
                size: 10,      // 网格大小 10px
                visible: true, // 渲染网格背景
            },
        });
        graph.fromJSON(data)
    }, [])
    function onClickAddRect() {
        const rect = new Shape.Rect({
            parent: 'node2',
            width: 30,
            height: 30,
        })

        graph.addNode(rect)
        // rect.attr('label/text', 'hello')
    }
    return (
        <div style={{ height: '900px' }}>
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f5f5f5',
                userSelect: 'none',
            }}>
                <SplitBox split="horizontal"
                    minSize={45}
                    maxSize={45}
                    defaultSize={'95%'}
                    primary="second" >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#fff7e6',
                    }}>
                        <TopToolBar />
                    </div>
                    <SplitBox split='vertical'
                     primary='first' 
                     defaultSize={'5%'}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: '#e6f7ff',
                        }}>sider</div>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: '#f5f5f5',
                        }}>
                            <SplitBox split='vertical'  defaultSize={'95%'}>
                                <div id="container"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}></div>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: '#f6ffed',
                                }}>
                                    <Button onClick={onClickAddRect}>添加矩形</Button>
                                </div>
                            </SplitBox>
                        </div>

                    </SplitBox>

                </SplitBox>
            </div>
        </div>
    )
}