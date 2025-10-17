import request from '../utils/request'

// 发送验证码
export const getCode = (data) => {
    return request.post('/get/code',data)
}

// 注册
export const userAuthentication = (data) => {
    return request.post('/user/authentication',data)
}

// 登录
export const login = (data) => {
    return request.post('/login',data)
} 

// 管理账号列表
export const authAdmin = (params) => {
    return request.get('auth/admin',{params})
} 

// 菜单权限数据
export const userGetMenu = () => {
    return request.get('/user/getmenu')
}

// 权限修改
export const userSetmenu = (data) => {
    return request.post('/user/setmenu',data)
}

// 菜单权限列表
export const menuList = ( params ) => {
    return request.get('/menu/list',{params})
}