import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILinksApiModel } from "../../models/links";
import { linksApi } from "../../services/links";

export interface ILinksState {
  links: ILinksApiModel[]
}

const initialState: ILinksState  = {
  links: [
    {
      short_url: 'http://localhost/link/caN3Bf',
      original_url: 'https://example.com',
      id: 'caN3Bf'
    }
  ],
}

const loadLinksFromLocalStorage = () : ILinksState => {
  const savedState = localStorage?.getItem('links');
  console.log(savedState);
  return savedState ? {links: JSON.parse(savedState) } : initialState; // Значения по умолчанию
};

export const linksSlice = createSlice({
  name: "links",
  initialState: loadLinksFromLocalStorage(),
  reducers: {
    addLink: (state, action: PayloadAction<ILinksApiModel>) => {
      state.links = state.links.concat(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(linksApi.endpoints.getShortLink.matchFulfilled,
    (state, action) => {
      state.links = [action.payload, ...state.links];
      localStorage?.setItem('links', JSON.stringify(state.links));
    }); 
  }
});

export const { addLink } = linksSlice.actions;

export default linksSlice.reducer;
