const prisma = require('./prisma');

//post queries
async function getPosts() {
    try {
        const posts = await prisma.post.findMany()
        return posts;
    } catch(error) {
        console.error("Couldn't find blog posts: ", error);
    }
}

async function getSinglePost(postId) {
    const post = parseInt(postId)
    const singlePost = await prisma.post.findMany({
        where: {
            id: post,
        },
        include: {
            user: true,
        },
        select: {
                id: true,
                title: true,
                body: true,
                published: true,
                postTime: true,
                comments: {
                        id: true,
                        author: true,
                        createdAt: true,                        
                        authorId: true,
                        content: true
                    }
                }
            })
    return singlePost;
}

async function createPost(author, title, body) {
    try {
        await prisma.post.create({
            data: {
                authorId: author,
                title: title,
                body: body,
            }
        })
    } catch(error) {
        console.error("Failed to create post: ", error);
    }
}

module.exports = {
    getPosts,
    getSinglePost,
    createPost
}