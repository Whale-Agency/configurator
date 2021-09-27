import { loadable } from "frontity";
let reactKonva = loadable(() => import("./Components/index.js"));

export default {
  name: "kh-product-customizer",
  roots: {},
  state: {
    customizer: {
      visible: false,
      size: {
        height: 0,
        width: 0,
      },
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
        // if the customizer is not visible, we need to first get the desired sizes before toggling
        // We also check the state if the width and height are already present. This handles the case when the user opened it once and closed it after.
        if (
          !state.customizer.visible &&
          (state.customizer.size.width === 0 || state.customizer.height === 0)
        ) {
          const { mainAreaRef } = await state.customizer;
          const sizes = await mainAreaRef.current.getBoundingClientRect();

          state.customizer.size.width = await sizes.width;
          state.customizer.size.height = await sizes.height;
        }

        state.customizer.visible = !state.customizer.visible;
      },
    },
  },
};
