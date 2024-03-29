import { StatusCodes } from 'http-status-codes'

async function getResponseData<T>(res: Response): Promise<T | undefined> {
  try {
    const data: T = await res.json()
    return data
  } catch (err) {
    console.error('get data failed')
    return undefined
  }
}

export async function fetchData<T>(route: string): Promise<T | undefined> {
  const res = await fetch(route)
  return getResponseData<T>(res)
}

export async function postData<T>(route: string, data: T): Promise<Response> {
  return fetch(route, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
}

export async function postAndGet<T1, T2>(
  route: string,
  dataToPost: T2,
): Promise<T1 | undefined> {
  const res = await postData(route, dataToPost)
  if (res.status !== StatusCodes.OK) {
    console.log('res.status', res.status)
    return undefined
  }
  const responseData = await getResponseData<T1>(res)
  return responseData
}

export async function uploadFile(route: string, file: File) {
  const formData = new FormData()
  formData.append('image', file, file.name)
  return fetch(route, {
    method: 'POST',
    body: formData,
  })
}

export async function fetchFile(route: string) {
  const res = await fetch(route)
  const blob = await res.blob()
  return blob
}

export async function fetchDelete(route: string) {
  return fetch(route, {
    method: 'DELETE',
  })
}
