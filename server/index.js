import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "DELETE"],
});

let posts = [
  {
    id: new Date("2025-11-01").getTime().toString(),
    title: "게시글 1",
    content: "게시글 1 내용....",
    bookmark: true,
  },
  {
    id: new Date("2025-11-02").getTime().toString(),
    title: "게시글 2",
    content: "게시글 2 내용....",
    bookmark: false,
  },
  {
    id: new Date("2025-11-03").getTime().toString(),
    title: "게시글 3",
    content: "게시글 3 내용....",
    bookmark: false,
  },
  {
    id: new Date("2025-11-04").getTime().toString(),
    title: "게시글 4",
    content: "게시글 4 내용",
    bookmark: false,
  },
  {
    id: new Date("2025-11-05").getTime().toString(),
    title: "게시글 5",
    content: "게시글 5 내용....",
    bookmark: true,
  },
  {
    id: new Date("2025-11-06").getTime().toString(),
    title: "게시글 6",
    content: "게시글 6 내용",
    bookmark: false,
  },
  {
    id: new Date("2025-11-07").getTime().toString(),
    title: "게시글 7",
    content: "게시글 7 내용",
    bookmark: false,
  },
  {
    id: new Date("2025-11-08").getTime().toString(),
    title: "게시글 8",
    content: "게시글 8 내용",
    bookmark: true,
  },
  {
    id: new Date("2025-11-09").getTime().toString(),
    title: "게시글 9",
    content: "게시글 9 내용",
    bookmark: false,
  },
  {
    id: new Date("2025-11-10").getTime().toString(),
    title: "게시글 10",
    content: "게시글 10 내용",
    bookmark: false,
  },
  {
    id: new Date("2025-11-11").getTime().toString(),
    title: "게시글 11",
    content: "게시글 11 내용",
    bookmark: false,
  },
  {
    id: new Date("2025-11-12").getTime().toString(),
    title: "게시글 12",
    content: "게시글 12 내용",
    bookmark: false,
  },
  {
    id: new Date("2025-11-13").getTime().toString(),
    title: "게시글 13",
    content: "게시글 13 내용",
    bookmark: false,
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

fastify.get("/posts", async (req, res) => {
  await delay(1000);
  let page = req.query.page ? Number(req.query.page) : 1;
  if (Number.isNaN(page)) {
    page = 1;
  }
  const PAGE_SIZE = 3;
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  if (page > totalPages) {
    return res.status(404).send({ error: "페이지를 찾을 수 없습니다." });
  }
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedPosts = posts.slice(start, end);
  return {
    posts: paginatedPosts,
    total: posts.length,
    pageSize: PAGE_SIZE,
    page,
    totalPages: Math.ceil(posts.length / PAGE_SIZE),
  };
});

fastify.get("/infinite-posts", async (req, res) => {
  await delay(1000);
  let cursor = req.query.cursor;
  if (!cursor) {
    cursor = posts[0].id;
  }
  let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 3;
  if (Number.isNaN(pageSize)) {
    pageSize = 3;
  }
  const post = posts.find((post) => post.id === cursor);
  if (!post) {
    return res.status(404).send({ error: "게시글을 찾을 수 없습니다." });
  }
  const postIndex = posts.indexOf(post);
  const paginatedPosts = posts.slice(postIndex, postIndex + pageSize);
  const nextCursor = posts[postIndex + pageSize]?.id;
  return {
    posts: paginatedPosts,
    nextCursor: nextCursor ?? null,
    hasMore: nextCursor !== undefined,
  };
});

fastify.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).send({ error: "게시글을 찾을 수 없습니다." });
  }
  return post;
});

fastify.get("/posts/recommended", async (req, res) => {
  await delay(3000);
  const recommendedPosts = posts.slice(0, 3);
  return {
    posts: recommendedPosts,
  };
});

fastify.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const post = { id: Date.now().toString(), title, content };
  posts.push(post);
  return post;
});

fastify.delete("/posts/:id", (req, res) => {
  if (Math.random() < 0.5) {
    return res.status(408).send({ error: "요청 시간이 초과되었습니다." });
  }
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).send({ error: "게시글을 찾을 수 없습니다." });
  }
  posts = posts.filter((post) => post.id !== id);
  return { message: "게시글이 삭제되었습니다.", id: post.id };
});

fastify.put("/posts/:id/bookmark", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).send({ error: "게시글을 찾을 수 없습니다." });
  }
  post.bookmark = !post.bookmark;
  return post;
});

try {
  await fastify.listen({ port: 3000 });
  fastify.log.info(`Server is running on port ${3000}`);
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
