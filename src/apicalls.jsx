// async function fetchPosts() {
//     try {
//         const response = await api.get('/get_all_posts');
//         let postList = [];
//         for (let key in response.data) {
//             postList[key] = response.data[key];
//         }
//         for (let i = 0; i < postList.length; i++)
//             console.log(postList[i]);
//         setPosts(postList);
//     } catch (err) {
//         if (err.response) {
//             console.log(err.response.data);
//             console.log(err.response.status);
//             console.log(err.response.headers);
//         } else {
//             console.log(`Error: ${err.message}`);
//         }
//     }
// }