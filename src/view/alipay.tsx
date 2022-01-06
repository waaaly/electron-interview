/*
 * @Description:
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-08-10 16:57:02
 * @LastEditTime: 2021-08-30 14:16:37
 */
import React, { useEffect } from 'react';

export default () => {
    let canvasCtx: any = null;
    let count = 0;
    const balckArr = [];
    const witheArr = [];
    function drawPiece(x, y) {
        if (canvasCtx) {
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 10, 0, 2 * Math.PI);
            const chessstyle = canvasCtx.createRadialGradient(
                x + 2,
                y - 2,
                10,
                x + 2,
                y - 2,
                1
            );
            if (count % 2 === 0) {
                chessstyle.addColorStop(0, '#0A0A0A');
                chessstyle.addColorStop(1, '#636766');
            } else {
                chessstyle.addColorStop(0, '#D1D1D1');
                chessstyle.addColorStop(1, '#F9F9F9');
            }
            canvasCtx.fillStyle = chessstyle;
            canvasCtx.fill();
            canvasCtx.closePath();
        }
    }

    useEffect(() => {
        const el = document.getElementById('canvas');
        if (el) {
            canvasCtx = el.getContext('2d');
            canvasCtx.beginPath(); // 新建一条path
            for (let i = 1; i < 22; i++) {
                canvasCtx.moveTo(30, 30 * i); // 把画笔移动到指定的坐标
                canvasCtx.lineTo(630, 30 * i); // 绘制一条从当前位置到指定坐标(200, 50)的直线.
                canvasCtx.moveTo(30 * i, 30); // 把画笔移动到指定的坐标
                canvasCtx.lineTo(30 * i, 630); // 绘制一条从当前位置到指定坐标(200, 50)的直线.
            }
            // 闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
            canvasCtx.closePath();
            canvasCtx.stroke(); // 绘制路径。
            el.onclick = function (e) {
                const x = Math.round((e.clientX - el.offsetLeft) / 30) * 30;
                const y = Math.round((e.clientY - el.offsetTop) / 30) * 30;
                drawPiece(x, y);

                if (count % 2 === 0) {
                    balckArr.push([x, y]);
                } else {
                    witheArr.push([x, y]);
                }

                count += 1;

                const tips = document.getElementById('text');
                if (tips) {
                    if (count % 2 === 0) {
                        witheArr.push([x, y]);
                        tips.innerText = '黑子';
                    } else {
                        witheArr.push([x, y]);
                        tips.innerText = '白子';
                    }
                }
            };
        }
    }, []);

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    right: '0px',
                    background: 'red',
                    textAlign: 'center',
                }}
            >
                当前落子
                <p id="text">黑子</p>
            </div>
            <canvas
                style={{
                    margin: '30px 0 0 30px',
                    backgroundColor: '#FBFBEF',
                }}
                id="canvas"
                width="660"
                height="660"
            />
        </div>
    );
};
