const prisma = require('./prisma');

//post queries
async function getPosts() {
    const posts = await prisma.post.findMany()
    return posts;
}

async function createPost() {

}

module.exports = {
    getPosts,
    createPost
}