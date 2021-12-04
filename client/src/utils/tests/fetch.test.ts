import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fetchData, postData } from 'utils/fetch'

const Routes = {
  GET: `/posts/1`,
  GET_ALL: `/posts`,
  CREATE: `/posts`,
}
type Post = {
  id?: number
  title: string
  body: string
  userId: number
}

const newPost: Post = {
  title: 'foo',
  body: 'bar',
  userId: 1,
}

const posts: Post[] = [
  { ...newPost, id: 1 },
  { ...newPost, id: 2 },
]

const server = setupServer(
  rest.get(Routes.GET, (req, res, ctx) => {
    return res(ctx.json(posts[0]))
  }),
  rest.get(Routes.GET_ALL, (req, res, ctx) => {
    return res(ctx.json(posts))
  }),
  rest.post(Routes.CREATE, (req, res, ctx) => {
    const post = req.body as Post
    post.id = 111
    return res(ctx.json(post), ctx.status(StatusCodes.CREATED))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export async function validatePost(data: Post | undefined) {
  expect(data).toBeTruthy()
  expect(data?.id).toBeTruthy()
  expect(data?.body).toBeTruthy()
  expect(data?.title).toBeTruthy()
  expect(data?.userId).toBeTruthy()
}

// fetchData
test('fetchData', async () => {
  const data = await fetchData<Post>(Routes.GET)
  validatePost(data)
})

// postData
test('postData', async () => {
  const res = await postData<Post>(Routes.CREATE, newPost)
  expect(res.status).toBe(StatusCodes.CREATED)
})
