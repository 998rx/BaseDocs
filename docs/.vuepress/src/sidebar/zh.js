/*
 * @Author: zrx
 * @Date: 2025-08-08 14:37:33
 * @LastEditors: zrx
 * @LastEditTime: 2025-08-08 15:50:35
 * @FilePath: \pressDocs\docs\.vuepress\config\sidebar.js
 * @Description: 
 */
export const sidebar_zh = [
    {
        text: '肥料',
        children: [
            {
                text: '介绍',
                link: '/guide/gettingStart',
            },
            {
                text: 'Element组件',
                link: '/componentDocs/example',
            },
            {
                text: '自定义组件',
                link: '/componentDocs/customExample',
            }
        ],
    },
    {
        text: '工具',
        children: [
            {
                text: '介绍',
                link: '/api/apiUsing',
            },
        ],
    },

]