import { loadable } from "frontity";
let reactKonva = loadable(() => import("./Components"));

export default {
  name: "kh-product-customizer",
  roots: {},
  state: {
    customizer: {
      visible: false,
      imagePath: null,
      curImage: null,
      customizedHeater: null,
    },
  },
  libraries: {
    customizer: {
      Component: reactKonva,
      components: {},
    },
  },

  actions: {
    customizer: {
      toggleCustomizer: async ({ state }) => {
        state.customizer.visible = !state.customizer.visible;
      },
      updateCustomizerImages: ({ state }) => async (uploadedImage, customizedHeater) => {
        state.customizer.uploadedImage = uploadedImage;
        state.customizer.customizedHeater = customizedHeater;
      },
      setImagePath: ({ state }) => (path) => {
        state.customizer.imagePath = path;
      },
      setCurrentImage: ({ state }) => (image) => {
        state.customizer.curImage = image;
      },
    },
  },
};
