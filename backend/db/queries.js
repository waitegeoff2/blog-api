const prisma = require('./prisma');

//USER QUERIES

async function createUser(name, username, password) {
    await prisma.user.create({
        data: {
            name: name,
            username: username,
            password: password
        }
    })
}

async function becomeAuth(userId){
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            isAuth: true,
        }
    })
}

//POST QUERIES
//find all posts with authors
async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
            }
        })
        return posts;
    } catch(error) {
        console.error("Couldn't find blog posts: ", error);
    }
}

//get a post (include author and comments)
async function getSinglePost(postId) {
    try {
        const post = parseInt(postId)
        const singlePost = await prisma.post.findMany({
            where: {
                id: post,
            },
            include: {
                author: true,
                comments: true,
            },
            // select: {
            //         id: true,
            //         title: true,
            //         body: true,
            //         published: true,
            //         postTime: true,
            //         comments: {
            //                 id: true,
            //                 author: true,
            //                 createdAt: true,                        
            //                 authorId: true,
            //                 content: true
            //             }
            //         }
            })
        return singlePost;
    } catch(error) {
        console.error("Couldn't find this post: ", error);
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
    } catch(error) {
        console.error("Failed to create post: ", error);
    }
}

//COMMENT QUERIES (get individual comment section, including usernames)
async function getComments(postId) {
    try {
        const comments = await prisma.post.findFirst({
            where: {
                id: postId,
            },
            include: {
                author: true,
                comments: true,
            }
        })
        return comments;
    } catch(error) {
        console.error("Uhoh couldn't find comments: ", error);
    }
}

module.exports = {
    createUser,
    becomeAuth,
    getPosts,
    getSinglePost,
    createPost,
    getComments
}