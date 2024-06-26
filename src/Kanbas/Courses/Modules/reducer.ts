// import createSlice from Redux Toolkit for easier state and reducer management
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import modules from the local Database file as the initial list of modules
// import { modules } from "../../Database";

export interface Module {
  name: string;
  description: string;
  _id?: string;
  course: string;
  lessons: [];
}
// create reducer's initial state with default modules copied from database and a default empty module
const initialState = {
  modules: [] as Module[], // the list of modules, initially set from the imported database
  module: { name: "New Module 123", description: "New Description" }, // default module structure for creating new modules
};

// create slice with name, initial state, and reducers
const modulesSlice = createSlice({
  name: "modules", // name the slice 'modules'
  initialState, // set the initial state for this slice
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    // declare reducer functions
    // addModule function to add a new module to the state
    addModule: (state, action: PayloadAction<Module>) => {
      state.modules = [action.payload, ...state.modules];
    },

    // deleteModule function to remove a module by its ID
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload // module ID to delete is in action.payload
      ); // filter out the module with the matching ID to delete it
    },
    // updateModule function to update an existing module's details
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) { // if the module's ID matches the ID in action.payload
          return action.payload; // replace it with the updated module from action.payload
        } else {
          return module; // otherwise, leave the module unchanged
        }
      });
    },
    // setModule function to select a module for editing
    setModule: (state, action: PayloadAction<Module>) => {
      state.module = action.payload; // set the module to the one provided in action.payload
    },
  },
});

// export all reducer functions as named exports
export const { addModule, deleteModule, updateModule, setModule, setModules } = modulesSlice.actions;

// export the reducer as the default export of this module
export default modulesSlice.reducer;