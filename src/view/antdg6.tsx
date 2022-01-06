/*
 * @Description:
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-30 14:56:42
 * @LastEditTime: 2021-08-02 11:19:06
 */
import React, { useEffect } from 'react';
import G6 from '@antv/g6';
import data from '../mock/g6';

export default (): JSX.Element => {
    useEffect(() => {
        const container = document.getElementById('container');
        if (!container) {
            return;
        }
        const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
        const graph = new G6.TreeGraph({
            container: 'container',
            width,
            height,
            linkCenter: true,
            modes: {
                default: [
                    {
                        type: 'collapse-expand',
                        onChange: function onChange(item: any, collapsed) {
                            const model = item.getModel();
                            model.collapsed = collapsed;
                            return true;
                        },
                    },
                    'drag-canvas',
                    'zoom-canvas',
                ],
            },
            defaultNode: {
                size: 26,
                anchorPoints: [
                    [0, 0.5],
                    [1, 0.5],
                ],
            },
            defaultEdge: {
                type: 'cubic-vertical',
            },
            layout: {
                type: 'compactBox',
                direction: 'TB',
                getId: function getId(d: any) {
                    return d.id;
                },
                getHeight: function getHeight() {
                    return 16;
                },
                getWidth: function getWidth() {
                    return 16;
                },
                getVGap: function getVGap() {
                    return 80;
                },
                getHGap: function getHGap() {
                    return 20;
                },
            },
        });

        graph.node(function (node) {
            let position = 'right';
            let rotate = 0;
            if (!node.children) {
                position = 'bottom';
                rotate = Math.PI / 2;
            }
            return {
                label: node.id,
                labelCfg: {
                    position,
                    offset: 5,
                    style: {
                        rotate,
                        textAlign: 'start',
                    },
                },
            };
        });

        graph.data(data);
        graph.render();
        graph.fitView();
    }, []);
    return <div id="container" />;
};
