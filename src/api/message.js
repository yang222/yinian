import request from '@/utils/request'
// 公告消息
export function getNoticeMessageList(params) {
  return request({
    url: '/adminNotice/getNoticeList',
    method: 'get',
    params
  })
}

export function insertNoticeMessage(params) {
  return request({
    url: '/adminNotice/editNotice',
    method: 'post',
    data: params
  })
}

export function getNoticeById(params) {
  return request({
    url: '/adminNotice/getNoticDetail',
    method: 'get',
    params
  })
}
export function unlineNoticeById(params) {
  return request({
    url: '/adminNotice/updateNoticeToDown',
    method: 'post',
    data: params
  })
}
export function onlineNoticeById(params) {
  return request({
    url: '/adminNotice/updateNoticeToUp',
    method: 'post',
    data: params
  })
}

// 弹窗广告
export function getPopupAdList(params) {
  return request({
    url: '/adminPopup/selectPopupList',
    method: 'get',
    params
  })
}
export function addPopup(params) {
  return request({
    url: '/adminPopup/editePopup',
    method: 'post',
    data: params
  })
}
export function getPopupDetailById(params) {
  return request({
    url: '/adminPopup/getPopupDetailById',
    method: 'get',
    params
  })
}
export function onlinePopup(params) {
  return request({
    url: '/adminPopup/updatePopupToUp',
    method: 'post',
    data: params
  })
}
export function unlinePopup(params) {
  return request({
    url: '/adminPopup/updatePopupToDown',
    method: 'post',
    data: params
  })
}

// 开屏广告
export function getOpenAdList(params) {
  return request({
    url: '/adminAdvertisemen/selectAdvertisementList',
    method: 'get',
    params
  })
}

export function insertAdvertisement(params) {
  return request({
    url: '/adminAdvertisemen/editeAdvertisement',
    method: 'post',
    data: params
  })
}

export function getAdvertisementDettailById(params) {
  return request({
    url: '/adminAdvertisemen/getAdvertisementDettailById',
    method: 'post',
    data: params
  })
}
export function onlineScreenAdById(params) {
  return request({
    url: '/adminAdvertisemen/updateAdvertisementToUp',
    method: 'post',
    data: params
  })
}
export function unlineScreenAdById(params) {
  return request({
    url: '/adminAdvertisemen/updateAdvertisementToDown',
    method: 'post',
    data: params
  })
}

// 广告位管理
export function getAdPositionList(params) {
  return request({
    url: '/advertiseLocation/getAdverLocationList',
    method: 'post',
    data: params
  })
}

export function newAdPosition(params) {
  return request({
    url: '/advertiseLocation/editAdvertiseLocation',
    method: 'post',
    data: params
  })
}

export function getAdPositionDetail(params) {
  return request({
    url: '/advertiseLocation/getAdverLocationDetail',
    method: 'post',
    data: params
  })
}
export function onlineAdPosition(params) {
  return request({
    url: '/advertiseLocation/updateAdvertiseLocationToUp',
    method: 'post',
    data: params
  })
}
export function unlineAdPosition(params) {
  return request({
    url: '/advertiseLocation/updateAdvertiseLocationToDown',
    method: 'post',
    data: params
  })
}
