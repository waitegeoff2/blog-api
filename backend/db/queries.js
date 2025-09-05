const prisma = require('./prisma');

//USER QUERIES

async function createUser(name, username, password) {
    try {
        await prisma.user.create({
            data: {
                name: name,
                username: username,
                password: password
            }
        })
    } catch(error) {
        console.error("Something went wrong: ", error);
    }
}

async function becomeAuth(userId){
    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isAuth: true,
            }
        })
    } catch(error) {
        console.error("Something went wrong: ", error);
    }
}

//POST QUERIES
//find all posts with authors
async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
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
        const postIdentity = parseInt(postId)
        console.log(postIdentity)
        const singlePost = await prisma.post.findFirst({
            where: {
                id: postIdentity,
            },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true,
                    },
                },
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

async function getUserPosts(userId){
    try{ 
    const posts = await prisma.post.findMany({
        where: {
            authorId: userId,
        },
        include: {
            author: true,
        }
    })

    return posts;
    } catch (error) {
        console.error("Couldn't find posts: ", error)
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

//delete post
async function deletePost(postId){
    try{ 
        await prisma.post.delete({
            where: {
                id: postId,
            }
        })
    } catch(error) {
        console.error("Something went wrong: ", error);
    }
}

//post a comment
async function postComment(postId, author, content){
    try {
    //     //is this necessary????
    // const authorId = await prisma.post.findFirst({
    //     where: {
    //         id: postId,
    //     },
    //     select: {
    //         authorId: true,
    //     }
    // })

    await prisma.comment.create({
        data: {
            postId: postId,
            content: content,
            authorId: author,
        }
    })
    }
    catch(error) {
        console.error("Something went wrong: ", error);
    }
}

async function deleteComment(commentId){
    try {
        await prisma.comment.delete({
            where: {
                id: commentId,
            }
        })
    } catch(error) {
        console.error("Something went wrong: ", error);
    } 
}

//GET COMMENTS ON INDIVIDUAL POST
//REDUNDANT

// async function getComments(postId) {
//     try {
//         const comments = await prisma.post.findFirst({
//             where: {
//                 id: postId,
//             },
//             include: {
//                 author: true,
//                 comments: true,
//             }
//         })
//         return comments;
//     } catch(error) {
//         console.error("Uhoh couldn't find comments: ", error);
//     }
// }

module.exports = {
    createUser,
    becomeAuth,
    getPosts,
    getSinglePost,
    getUserPosts,
    createPost,
    deletePost,
    postComment,
    deleteComment
}