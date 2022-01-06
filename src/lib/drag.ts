import { EventEmitter } from 'events';

/*
 * @Description:
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-08-09 13:40:54
 * @LastEditTime: 2021-08-18 17:43:09
 */
export function getElement(id: string): HTMLElement | null {
    return document.getElementById(id);
}

export function getCss(target: HTMLElement | null, key: string): any {
    if (!target) return null;
    return target.style
        ? target.style[key]
        : document.defaultView?.getComputedStyle(target)[key];
}

export function drag(dragId: string, targetId: string) {
    // 拖动对象
    const dragEl = getElement(dragId);
    let isMove = true;
    if (!dragEl) return;
    dragEl.onmousedown = (eventDown) => {
        isMove = true;
        // 目标对象
        const targetEl = getElement(targetId);
        // 鼠标按下事件
        const mouseDownX = eventDown.clientX; // 鼠标按下X的坐标
        const mouseDownY = eventDown.clientY; // 鼠标按下Y的坐标
        // 获取盒子的初始left值
        const leftDown = parseInt(
            getCss(targetEl, 'left').replace('px', ''),
            10
        );
        // 获取盒子的初始top值
        const topDown = parseInt(getCss(targetEl, 'top').replace('px', ''), 10);
        dragEl.onmousemove = (eventMove) => {
            // 鼠标移动事件
            if (!targetEl) return;
            if (isMove) {
                const mouseMoveX = eventMove.clientX; // 鼠标移动X的坐标
                const mouseMoveY = eventMove.clientY; // 鼠标移动Y的坐标
                // 移动的坐标减去按下的坐标 = 移动的距离
                const offesX = mouseMoveX - mouseDownX;
                const offesY = mouseMoveY - mouseDownY;
                // 赋值给left和top
                targetEl.style.top = `${topDown + offesY}px`;
                targetEl.style.left = `${leftDown + offesX}px`;
            }
        };
        dragEl.onmouseleave = () => {
            isMove = false;
        };
        document.addEventListener('mouseup', () => {
            isMove = false;
        });
        // document.onmouseup = () => {
        //     // 鼠标抬起事件
        //     isMove = false;
        //     // this.onmousemove = null;
        //     // this.onmouseup = null;
        // };
        return false; // 阻止默认事件
    };
}

export function resize(id: string) {
    let isMove = true;
    const el = getElement(id);
    if (!el) return;
    el.onmouseover = (eventOver) => {
        // 鼠标划过时坐标
        const mouseOverX = eventOver.offsetX;
        const mouseOverY = eventOver.offsetY;
        // 元素上下左右四个边的位置和元素的长宽
        const T0 = el.clientTop;
        const L0 = el.clientLeft;
        const W = el.offsetWidth;
        const H = el.offsetHeight;
        // 鼠标划过哪条边
        // 右下范围
        const areaRB =
            L0 + W - 10 < mouseOverX &&
            mouseOverX < L0 + W + 10 &&
            T0 + H - 10 < mouseOverY &&
            mouseOverY < T0 + H + 10;
        // console.log(L0 + W, mouseOverX, T0 + H, mouseOverY, eventOver.offsetY);
        if (areaRB) {
            el.style.cursor = 'se-resize';
        } else {
            el.style.cursor = 'auto';
        }
    };
    el.onmousedown = function (eventDown) {
        isMove = true;
        // 鼠标按下时的位置
        const mouseDownX = eventDown.clientX;
        const mouseDownY = eventDown.clientY;
        // 元素上下左右四个边的位置和元素的长宽
        const T0 = el.offsetTop;
        const B0 = el.offsetTop + el.offsetHeight;
        const L0 = el.offsetLeft;
        const R0 = el.offsetLeft + el.offsetWidth;
        const W = el.offsetWidth;
        const H = el.offsetHeight;
        // 设置元素的识别范围
        const areaT = T0 + 10;
        const areaB = B0 - 10;
        const areaL = L0 + 10;
        const areaR = R0 - 10;
        // 判断改变元素的大小的方向
        // 左
        const changeL = mouseDownX < areaL;
        // 右
        const changeR = mouseDownX > areaR;
        // 上
        const changeT = mouseDownY < areaT;
        // 下
        const changeB = mouseDownY > areaB;
        // IE8 取消默认行为-设置全局捕获
        // if (el.setCapture) {
        //     el.setCapture();
        // }
        el.onmousemove = function (eventMove) {
            if (!isMove) return;
            // 鼠标移动时的鼠标位置
            const mouseMoveX = eventMove.clientX;
            const mouseMoveY = eventMove.clientY;
            // 根据改变元素大小的方向不同进行大小的改变
            // 左
            if (changeL) {
                el.style.width = `${mouseDownX - mouseMoveX + W}px`;
                el.style.left = `${L0 - (mouseDownX - mouseMoveX)}px`;
            }
            // 右
            if (changeR) {
                el.style.width = `${mouseMoveX - mouseDownX + W}px`;
            }
            // 上
            if (changeT) {
                el.style.height = `${mouseDownY - mouseMoveY + H}px`;
                el.style.top = `${T0 - (mouseDownY - mouseMoveY)}px`;
            }
            // 下
            if (changeB) {
                el.style.height = `${mouseMoveY - mouseDownY + H}px`;
            }
            // 限定范围
            if (parseInt(el.style.width, 10) < 10) {
                el.style.width = `${10}px`;
            }
            if (parseInt(el.style.height, 10) < 10) {
                el.style.height = `${10}px`;
            }
        };
        el.onmouseleave = () => {
            // isMove = false;
        };
        document.addEventListener('mouseup', () => {
            isMove = false;
        });
        return false;
    };
}

export function moveable(id: string, ee: EventEmitter) {
    const el = getElement(id);
    if (!el) return;

    let mouseDownXByEl = 0;
    let mouseDownYByEl = 0;
    el.onmousedown = (e: MouseEvent) => {
        ee.emit('active', id.split('-')[0], id.split('-')[1]);
        mouseDownXByEl = e.layerX;
        mouseDownYByEl = e.layerY;
        el.ondragend = (ev) => {
            const canvasOffsetTop =
                document.getElementById('right-canvas')?.offsetTop || 0;
            el.style.top = `${ev.clientY - canvasOffsetTop - mouseDownYByEl}px`;
            el.style.left = `${ev.clientX - mouseDownXByEl}px`;
        };
    };
}

export function dirctionKeyListener(id: string, ee: EventEmitter) {
    const el = getElement(id);
    if (!el) return;

    el.onkeydown = (e: KeyboardEvent) => {
        // console.log(e.key, el.style.top, el.style.left);
        switch (e.key) {
            case 'ArrowUp':
                ee.emit(
                    'direction-key-down',
                    'top',
                    parseInt(el.style.top, 10) - 1
                );
                break;
            case 'ArrowDown':
                ee.emit(
                    'direction-key-down',
                    'top',
                    parseInt(el.style.top, 10) + 1
                );
                break;
            case 'ArrowLeft':
                ee.emit(
                    'direction-key-down',
                    'left',
                    parseInt(el.style.left, 10) - 1
                );
                break;
            case 'ArrowRight':
                ee.emit(
                    'direction-key-down',
                    'left',
                    parseInt(el.style.left, 10) + 1
                );
                break;
            default:
                break;
        }
    };
}

export function dbClickEditText(el: HTMLElement) {
    const oldhtml = el.innerHTML;
    // 创建新的input元素
    const newobj = document.createElement('input');
    // 为新增元素添加类型
    newobj.type = 'text';
    // 为新增元素添加value值
    newobj.value = oldhtml;
    // 为新增元素添加光标离开事件
    newobj.onblur = function () {
        el.innerHTML = newobj.value === oldhtml ? oldhtml : newobj.value;
        // 当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
    };
    // 设置该标签的子节点为空
    el.innerHTML = '';
    // 添加该标签的子节点，input对象
    el.appendChild(newobj);
    // 设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
    newobj.setSelectionRange(0, oldhtml.length);
    // 设置获得光标
    newobj.focus();
}

export function createCell() {
    const inputCell = (el: HTMLElement) => {
        el.setAttribute('draggable', 'true');

        const labelEl = document.createElement('label');
        const inputEl = document.createElement('input');
        labelEl.innerText = '标签:';
        inputEl.setAttribute('placeholder', '说些什么');
        labelEl.appendChild(inputEl);

        el.appendChild(labelEl);
    };

    const btnCell = (el: HTMLElement) => {
        el.setAttribute('draggable', 'true');

        const btnEl = document.createElement('button');
        btnEl.innerText = '按钮文本';

        btnEl.addEventListener('dblclick', () => dbClickEditText(btnEl));
        el.appendChild(btnEl);
    };

    const spanCell = (el: HTMLElement) => {
        el.setAttribute('draggable', 'true');

        const spanEl = document.createElement('span');
        spanEl.innerText = '文本内容';
        spanEl.addEventListener('dblclick', () => dbClickEditText(spanEl));

        el.appendChild(spanEl);
    };

    const selectCell = (el: HTMLElement) => {
        el.setAttribute('draggable', 'true');

        const labelEl = document.createElement('label');
        const selectEl = document.createElement('select');
        const canvasSelecters =
            document
                .getElementById('right-canvas')
                ?.getElementsByTagName('select').length || 0;

        selectEl.options.add(new Option('下拉以选择', '', true, true));
        labelEl.innerText = `下拉菜单${canvasSelecters + 1}:`;

        el.appendChild(labelEl);
        el.appendChild(selectEl);
    };
    return new Map([
        ['input', inputCell],
        ['button', btnCell],
        ['span', spanCell],
        ['select', selectCell],
    ]);
}
