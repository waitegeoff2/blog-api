const prisma = require('./prisma');

//post queries
async function getPosts() {
    try {
        const posts = await prisma.post.findMany()
        return posts;
    } catch(err) {
        console.error("Couldn't find blog posts: ", err);
    }
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
    } catch(err) {
        console.error("Failed to create post: ", err);
    }
}

module.exports = {
    getPosts,
    createPost
}