let API_URL = "http://192.168.1.8:8000";
export const deletePost = (postId) => {


    fetch(API_URL + `/posts/delete?id=${postId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((res) => console.log(JSON.stringify(res)));
}

