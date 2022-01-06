/*
 * @Description:
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-08-11 13:20:04
 * @LastEditTime: 2021-08-11 13:52:50
 */
import React from 'react';

type CellBase = {
    cellId: string;
    htmlEl: string;
};

type CellPosition = {
    top: number;
    left: number;
};

export default class Cell extends React.Component {
    private cellId: string;

    private htmlEl: string;

    private position: CellPosition | null;

    constructor(props: CellBase) {
        super(props);
        this.cellId = props.cellId;
        this.htmlEl = props.htmlEl;
        this.position = null;
    }

    setPosition(p: CellPosition): Cell {
        this.position = p;
        return this;
    }
}
