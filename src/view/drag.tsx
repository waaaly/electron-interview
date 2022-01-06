/*
 * @Description:
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-08-09 14:36:51
 * @LastEditTime: 2021-08-19 16:21:56
 */
import React, { useEffect, useState } from 'react';
import EventEmitter from '@antv/event-emitter';
import { MongoClient } from 'mongodb';
import { dirctionKeyListener, moveable, resize, createCell } from '../lib/drag';

export default (): JSX.Element => {
    let startX = 0;
    let startY = 0;
    let cellType = '';
    let activeEl1 = '';
    const [activeEl, setactiveEl] = useState('0-0');
    const ee = new EventEmitter();
    ee.on('direction-key-down', (name: string, value: string) => {
        console.log(activeEl1);
        const el = document.getElementById(activeEl1);
        // console.log(el, name, value);
        if (!el) return;
        el.style[name] = `${value}px`;
    });
    ee.on('active', (type: string, id: number) => {
        setactiveEl(`${type}-${id}`);
        activeEl1 = `${type}-${id}`;
        const activeEl = document.getElementById(`${type}-${id}`);
        const attrEl = document.getElementById('attr-borad');
        if (!activeEl) return;
        switch (type) {
            case 'button':
                const inputEls = attrEl?.getElementsByTagName('input');
                if (!inputEls) break;
                Array.from(inputEls).forEach((el) => {
                    console.log(el.id, el[el.id]);

                    switch (el.id) {
                        case 'innerText':
                            el.value = activeEl[el.id] || '';
                            break;
                        case 'height':
                        case 'width':
                            el.value = window
                                .getComputedStyle(activeEl)
                                [el.id].replace('px', '');
                            break;
                        default:
                            break;
                    }
                });
                break;
            default:
                break;
        }
    });
    useEffect(() => {
        const el = document.getElementById('right-canvas');
        if (window.myMap) {
            window.myMap.forEach((value) => {
                value.setAttribute('draggable', 'true');
                el?.appendChild(value);
            });
        }
    }, []);

    const onMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        type: string
    ) => {
        startX = e.nativeEvent.offsetX;
        startY = e.nativeEvent.offsetY;
        cellType = type;
    };
    const dragStart = (e: {
        dataTransfer: { setData: (arg0: string, arg1: string) => void };
    }) => {
        e.dataTransfer.setData(
            'cell',
            JSON.stringify({
                cellId: 1,
                htmlEl: cellType,
            })
        );
    };
    const dragOverCanvas = (e: { preventDefault: () => void }) => {
        // allow drop
        e.preventDefault();
    };
    const dropCanvas = (e: {
        clientX: number;
        clientY: number;
        dataTransfer: { getData: (arg0: string) => string };
    }) => {
        if (e.dataTransfer.getData('cell').length === 0) {
            return;
        }
        const cell = JSON.parse(e.dataTransfer.getData('cell'));
        const el = document.createElement('div');
        const canvasTop =
            document.getElementById('right-canvas')?.offsetTop || 0;
        const canvasChilds = document.getElementById('right-canvas')?.childNodes
            .length;
        el.id = `${cell.htmlEl}-${canvasChilds}`;

        el.style.position = 'absolute';
        el.style.top = `${e.clientY - canvasTop - startY}px`;
        el.style.left = `${e.clientX - startX}px`;

        createCell().forEach((value, key) => {
            if (cell.htmlEl === key) {
                value.call(this, el);
            }
        });

        document.getElementById('right-canvas')?.appendChild(el);
        moveable(el.id, ee);
        dirctionKeyListener(el.id, ee);
        // resize('1');
    };
    const buttonTextOnchang = (e: { target: { value: string } }) => {
        const el = document.getElementById(activeEl);
        console.log(activeEl);
        if (!el) {
            return;
        }
        el.innerText = e.target.value;
    };
    const onSaveClick = () => {
        const canvasChilds = document.getElementById('right-canvas')?.children;
        if (!canvasChilds) return;
        const arr = Array.from(canvasChilds);
        console.log(arr);
        const childMap = new Map();
        Array.from(canvasChilds).forEach((item) => {
            childMap.set(item.id, item);
        });
        // console.log(childMap);
        window.myMap = childMap;
        MongoClient.connect('mongodb://localhost:27017')
            .then((conn) => {
                conn.db('myTest')
                    .collection('form')
                    .insertOne({ name: 'add_user', map: arr })
                    .then((dres) => {
                        console.log(dres);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="flex-full-height">
            <div
                id="right-canvas"
                className="right-canvas"
                onDragOver={dragOverCanvas}
                onDrop={dropCanvas}
            />
            <div className="left-tool">
                <img
                    draggable="true"
                    onMouseDown={(e) => onMouseDown(e, 'input')}
                    onDragStart={dragStart}
                    src={require('../assets/svg/input.svg')}
                    alt="输入框"
                />
                <img
                    draggable="true"
                    onMouseDown={(e) => onMouseDown(e, 'button')}
                    onDragStart={dragStart}
                    src={require('../assets/svg/button.svg')}
                    alt="按钮"
                />
                <img
                    draggable="true"
                    onMouseDown={(e) => onMouseDown(e, 'span')}
                    onDragStart={dragStart}
                    src={require('../assets/svg/span.svg')}
                    alt="文本"
                />
                <img
                    draggable="true"
                    onMouseDown={(e) => onMouseDown(e, 'select')}
                    onDragStart={dragStart}
                    src={require('../assets/svg/select.svg')}
                    alt="下拉菜单"
                />
                <div>
                    <p>属性设置</p> <button onClick={onSaveClick}>保存</button>
                    {activeEl.split('-')[0] === 'input' && <p>输入框</p>}
                    {activeEl.split('-')[0] === 'button' && (
                        <div id="attr-borad">
                            <p>按钮</p>
                            <span>文本内容：</span>
                            <input
                                id="innerText"
                                onChange={buttonTextOnchang}
                            />
                            <br />
                            <span>宽度：</span>
                            <input id="width" type="number" step="1" />
                            <span>px</span>
                            <br />
                            <span>高度：</span>
                            <input id="height" type="number" step="1" />
                            <span>px</span>
                            <br />
                        </div>
                    )}
                </div>
            </div>
            {/* <div id="box" style={{ top: '10px', left: '10px' }}>
                <div id="main">
                    <div id="bar">标题</div>
                    <div id="content">内容……</div>
                </div>
            </div> */}
        </div>
    );
};
