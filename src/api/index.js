import request from '../utils/request'

// 发送验证码
export const getCode = (data) => {
    return request.post('/get/code',data)
}

export const userAuthentication = (data) => {
    return request.post('/user/authentication')
}

export const login = (data) => {
    return request.post('/login')
} 