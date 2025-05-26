import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser } from '../services/api'
// Get token and user from localStorage initially
const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')

// Convert user from string to object if found
const parsedUser = storedUser ? JSON.parse(storedUser) : null

// Initial state of the auth slice
const initialState = {
  user: parsedUser,
  token: storedToken,
  isAuthenticated: !!storedToken, // true if token exists
  loading: false,
  error: null,

}

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login: save user and token to state + localStorage
    // login(state, action) {
    //   const { user, token } = action.payload
    //   state.user = user
    //   state.token = token
    //   state.isAuthenticated = true

    //   localStorage.setItem('user', JSON.stringify(user))
    //   localStorage.setItem('token', token)
    // },

    // Logout: clear everything
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false

      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  }
})

// Export actions to use in components
export const { logout } = authSlice.actions

// Login Thunk
export const loginThunk = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await loginUser(formData)
      const { user, token } = response

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      return { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed')
    }
  }
)

// Export reducer to add to the store
export default authSlice.reducer