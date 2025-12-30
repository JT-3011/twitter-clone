import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const BASE_URL = 'https://api.example.com';


export const savePost = createAsyncThunk(
    'posts/savePost',
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;
        const data = {
            title: "Post Title",
            content: postContent,
            userId: userId,
        };
        const response = await axios.post(`${BASE_URL}/posts`, data);
        return response.data;
    }
);


export const fetchPostsByUser = createAsyncThunk('posts/fetchPostsByUser',
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
)
const postsSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.pending, (state, action) => {
            state.loading = false;
            state.posts = action.payload
        });
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [action.payload, ...state.posts];
        },
});
export default postsSlice.reducer;