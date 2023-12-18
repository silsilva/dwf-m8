import { atom, selector, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist({
  key: "data",
  storage: localStorage,
});

export const token = atom({
  key: "token",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export const useToken = () => useRecoilState(token);
//
// ATOM DE ImageDataURL
export const ImageDataURL = atom({
  key: "ImageDataURL",
  default: null,
});
export const useImageDataURL = () => useRecoilState(ImageDataURL);
//
// ATOM DE _geoloc
export const geoloc = atom({
  key: "_geoloc",
  default: {
    lat: null,
    lng: null,
  },
  effects_UNSTABLE: [persistAtom],
});
export const useGeoloc = () => useRecoilState(geoloc);
//
//
//
export const userProfile = selector({
  key: "userProfile",
  get: async ({ get }) => {
    const userToken = get(token);

    if (userToken) {
      const response = await fetch("https://proyecto7-fecm.onrender.com/me", {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `bearer ${userToken.token}`,
        },
      });

      const data = await response.json();

      return data;
    }
  },
});
