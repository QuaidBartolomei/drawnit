export async function getResponseData<T>(
  res: Response
): Promise<T | undefined> {
  try {
    const data = await res.json();
    return data as T;
  } catch (err) {
    return undefined;
  }
}

export async function fetchData<T>(route: string): Promise<T | undefined> {
  let res = await fetch(route);
  return getResponseData<T>(res);
}

export async function postData<T>(route: string, data: T): Promise<Response> {
  return await fetch(route, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}

export async function postAndGet<T1, T2>(
  route: string,
  dataToPost: T2
): Promise<T1 | undefined> {
  let res = await postData(route, dataToPost);
  let responseData = await getResponseData<T1>(res);
  return responseData;
}

export async function uploadFile(route: string, file: File) {
  var formData = new FormData();
  formData.append('image', file, file.name);
  return fetch(route, {
    method: 'POST',
    body: formData,
  });
}

export async function fetchFile(route: string) {
  let res = await fetch(route);
  let blob = await res.blob();
  return blob;
}
export async function fetchDelete(route: string) {
  return fetch(route, {
    method: 'DELETE',
  });
}
