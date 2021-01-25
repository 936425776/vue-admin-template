export const menus = [
     {
        icon: 'el-icon-lx-home',
        index: 'dashboard',
        title: '系统首页',
        path: 'dashboard',
        id:0,
        component: 'Dashboard',
        meta: { title: '系统首页' }
    },
    {
        icon: 'el-icon-lx-skin',
        index: 'materialAdmin',
        title: '素材管理',
        path: 'materialAdmin',
        id:1,
        component: 'materialAdmin',
        meta: { title: '素材管理' }
    },
    {
        icon: 'el-icon-lx-group',
        index: '2',
        id:'',
        title: '组织管理',
        children: [
            {
                id:'2-1',
                index: 'roleAdmin',
                title: '角色管理',
                path: 'roleAdmin',
                component: 'roleAdmin',
                meta: { title: '角色管理' }
            },
            {   id:'2-2',
                index: 'userAdmin',
                title: '用户管理',
                path: 'userAdmin',
                component: 'userAdmin',
                meta: { title: '用户管理' }
            }
        ]
    },
    {
        icon: 'el-icon-monitor',
        index: '3',
        id:'',
        title: '设备管理',
        children: [
            {   
                id:'3-1',
                index: 'userDefined',
                title: '自定义组',
                path: 'userDefined',
                component: 'userDefined',
                meta: { title: '自定义组' }
            },
            {   
                id:'3-2',
                index: 'facilityList',
                title: '设备列表',
                path: 'facilityList',
                component: 'facilityList',
                meta: { title: '设备列表' }
            },
        ]
    },
    {
        icon: 'el-icon-video-play',
        index: '4',
        id:'',
        title: '播放管理',
        children: [
            {   id:'4-1',
                index: 'showMenus',
                title: '节目单管理',
                path: 'showMenus',
                component: 'showMenus',
                meta: { title: '节目单管理', }
            },
            {   id:'4-2',
                index: 'playGroup',
                title: '播放组合',
                path: 'playGroup',
                component: 'playGroup',
                meta: { title: '播放组合', }
            },
            {   id:'4-3',
                index: 'playTemplate',
                title: '播放模板',
                path: 'playTemplate',
                component: 'playTemplate',
                meta: { title: '播放模板', }
            },
        ]
    },
    {
        icon: 'el-icon-setting',
        index: '5',
        id:'',
        title: '系统管理',
        children: [
            {   id:'5-1',
                index: 'STSToken',
                title: 'STSToken',
                path: 'STSToken',
                component: 'STSToken',
                meta: { title: 'STSToken', }
            },
            {   id:'5-2',
                index: 'UploadAuth',
                title: 'UploadAuth',
                path: 'UploadAuth',
                component: 'UploadAuth',
                meta: { title: 'UploadAuth', }
            },
        ]
    },
]
export const menusMap = params =>{
    let listBox =[];
    params.map(item =>{
        if(item.id === 0){
            listBox[0] = item
        }else if(item.id === 1){
            listBox[1] = item
        }else if(item.id.includes('2-')){
            if(!listBox[2]){
                listBox[2] =   {
                icon: 'el-icon-lx-group',
                index: '2',
                title: '组织管理',
                children: []
                }
            }
            listBox[2].children.push(item)
        }else if(item.id.includes('3-')){
            if(!listBox[3]){
                listBox[3] = {
                    icon:'el-icon-monitor',
                    index: '3',
                    title: '设备管理',
                    children: []
                }
            }
            listBox[3].children.push(item)
        }else if(item.id.includes('4-')){
            if(!listBox[4]){
                listBox[4] = {
                    icon: 'el-icon-video-play',
                    index: '4',
                    title: '播放管理',
                    children: []
                }
            }
            listBox[4].children.push(item)
        }else if(item.id.includes('5-')){
            if(!listBox[5]){
                listBox[5] = {
                    icon: 'el-icon-setting',
                    index: '5',
                    title: '系统管理',
                    children: []
                }
            }
            listBox[5].children.push(item)
        }
    })
    return Array.from(listBox).filter(item => item != undefined)
}