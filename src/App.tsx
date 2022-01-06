/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-07-19 09:48:17
 * @LastEditTime: 2021-07-28 13:58:04
 */
import React from 'react';
import { Layout } from 'antd';
import RouteComponet from './route'
import { createHashHistory } from 'history';
import './App.global.css';
const { Header, Content, Footer, Sider } = Layout
export default function App() {
    return (
        //#ts-ignore
        <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
            {/* <Sider collapsible width={200}>侧边</Sider> */}
            <Layout>
                {/* <Header className="site-layout-background"></Header> */}
                <Content style={{ background: '#fff' }}>
                <RouteComponet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>底部</Footer>
            </Layout>
        </Layout >
    );
}

// const Hello = () => {
//   return (
//     <div>
//       <div className="Hello">
//         <img width="200px" alt="icon" src={icon} />
//       </div>
//       <h1>electron-react-boilerplate</h1>
//       <div className="Hello">
//         <a
//           href="https://electron-react-boilerplate.js.org/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               📚
//             </span>
//             Read our docs
//           </button>
//         </a>
//         <a
//           href="https://github.com/sponsors/electron-react-boilerplate"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               🙏
//             </span>
//             Donate
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

