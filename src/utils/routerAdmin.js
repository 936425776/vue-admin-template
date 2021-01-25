const  defaultRoutes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '403',
                component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: { title: '403' }
            },
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '*',
        redirect: '/404'
    }
]

// const dynamicRoutes = [
//     {
//         path: 'userAdmin',
//         component: 'userAdmin',
//         meta: { title: '用户管理' }
//     },
//     {
//         path: 'roleAdmin',
//         component: 'roleAdmin',
//         meta: { title: '角色管理' }
//     },
//     {
//         // 权限页面
//         path: 'permission',
//         component: 'permission',
//         meta: { title: '权限测试', permission: true }
//     },
//     {
//         // 权限页面
//         path: 'role1',
//         component: 'role1',
//         meta: { title: 'role1', }
//     },
// ]
const mapRoutes = fileName => resolve => require([`@/components/page/${fileName}.vue`], resolve)
/* import('') // 返回promise
reqiure('') // 返回组件对象 */
export { defaultRoutes, mapRoutes }