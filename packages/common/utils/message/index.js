import { RESPONSE_STATUS } from '../const/index.js'

/**
 * 通用响应体
 * @param success
 * @param code
 * @param data
 * @param message
 * @returns {{code: number, data: null, success: boolean, message: string}}
 */
export const commonResponse = ({ success = true, code = RESPONSE_STATUS.SUCCESS.code, data = null, message = '' } = {}) => {
    return {
        success,
        code,
        data,
        message
    }
}

/**
 * 成功响应体
 * @param data
 * @param message
 * @returns {{code: number, data: null, success: boolean, message: string}}
 */
export const commonResponseSuccess = ({ data } = {}) => {
    return commonResponse({
        data
    })
}

/**
 * 失败响应体
 * @returns {{code: number, data: null, success: boolean, message: string}}
 */
export const commonResponseFail = () => {
    return commonResponse({
        success: false,
        code: RESPONSE_STATUS.FAIL.code
    })
}

export const commonResponseFailBy = (responseStatus = RESPONSE_STATUS.FAIL) => {
    return commonResponse({
        success: false,
        code: responseStatus.code,
        message: responseStatus.message
    })
}