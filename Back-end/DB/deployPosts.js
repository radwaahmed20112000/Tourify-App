const Post = require('../Models/Post')
const loremIpsum = require("lorem-ipsum").loremIpsum;

module.exports = {

    deploy: async () => {
        const photo = 'https://picsum.photos/200/300'
        const emails = ['1@gmail.com',
            '2@gmail.com',
            '3@gmail.com',
            '4@gmail.com',
            '5@gmail.com',
            '6@gmail.com',
            '7@gmail.com',
            '8@gmail.com',
            '9@gmail.com',
            '10@gmail.com',
        ]
        for (let i = 0; i < 1; i++) {
            console.log("mama" + loremIpsum())
            await Post.createPost(emails[Math.floor(Math.random() * 10)], loremIpsum() + '', (err, post) => {
                post_id = post.insertId;
            })
                .then(() => {
                    const len = Math.floor(Math.random() * 6);
                    let photos = new Array(len).fill(photo)
                    uploadPhotosToAzure(photos)
                    PostPhoto.createPostPhoto(post_id, photos)
                    //    PostLocation.createPostLocation(post_id, req.body)
                    //    PostTags.createPostTags(post_id, tags)
                    return
                })

                .catch((err) => {
                    console.log('errorrrrrrrrr')
                });
        }


    }

}