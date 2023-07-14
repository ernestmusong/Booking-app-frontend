const { createAsyncThunk } = require("@reduxjs/toolkit");

const url = 'api/v1/session';

export const login = createAsyncThunk('src/redux/session/sessionSlice', async (user) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: user.name
        }),
    });
    const data = await response.json();
    return data;
});

const initialState = {

}