import request from '@/utils/request'

export const getDefalutData = () => request({
  method: 'GET',
  url: '/v2/diy/get_diy/moren'
})