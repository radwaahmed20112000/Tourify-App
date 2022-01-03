import baseUrl from "./IPAdress" 

export const deletePost = (postId) => {


    fetch(baseUrl + `posts/delete?id=${postId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((res) => console.log(JSON.stringify(res)));
}

