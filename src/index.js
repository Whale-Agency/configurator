import { loadable } from "frontity";
let reactKonva = loadable(() => import("./Components"));

export default {
  name: "kh-product-customizer",
  roots: {},
  state: {
    customizer: {
      visible: false,
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
    },
  },
};
