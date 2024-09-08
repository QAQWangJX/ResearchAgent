import useHttp from '@/hooks/useHttp'
const { post, get } = useHttp()
export function getUserId() {
  return get('/api/v1/userid')
}
export function getDetail (data) {
  const userId = localStorage.getItem('userId')
  return post(
    '/api/v1/ideas',
    {
      'user-id':userId
    },
    data
  )
}
export function logUpLoad (data) {
  const userId = localStorage.getItem('userId')
  const formData = new FormData()
  formData.append('clickElement', data)
  console.log(formData)
  return post(
    '/api/v1/click',
    {
      'user-id': userId,
      // 'Content-Type': 'multipart/form-data'
    },
    formData
  )
}
export function getPaperList () {
  return get(
    '/api/get_paper_list',
    {},
  )
}
export function getDataSearch (data) {
  const formData = new FormData()
  formData.append('query', data)
  return post(
    '/api/search',
    {},
    formData
  )
}
export function getDataContinue (data) {
  return get(
    `/api/continue?tab=${data}`
  )
}
export function exportReport () {
  return get(
    `/api/export`
  )
}
export function getDataRegenerate (data) {
  return post(
    `/api/regenerate?tab=${data}`,
    {},
    {
      feedback: ""
    }
  )
}
