import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture: string;
}

const initialState: UserState = {
  id: 0,
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  profilePicture: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
      state.profilePicture = action.payload.profilePicture;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.fullName = "";
      state.email = "";
      state.phoneNumber = "";
      state.address = "";
      state.profilePicture = "";
    },
    updateUserAction: (state, action: PayloadAction<Partial<UserState>>) => {
      // Memperbarui hanya field yang ada dalam payload
      const { fullName, email, phoneNumber, address, profilePicture } =
        action.payload;
      if (fullName !== undefined) state.fullName = fullName;
      if (email !== undefined) state.email = email;
      if (phoneNumber !== undefined) state.phoneNumber = phoneNumber;
      if (address !== undefined) state.address = address;
      if (profilePicture !== undefined) state.profilePicture = profilePicture;
    },
  },
});

export const { loginAction, logoutAction, updateUserAction } =
  userSlice.actions;
export default userSlice.reducer;
