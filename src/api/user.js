import request from '@/utils/request'
export const getUserInfo = () => {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export const setUserInfo = (data) => {
    return request({
        url: '/user/set-info',
        method: 'post',
        data
    })
}