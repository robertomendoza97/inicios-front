import { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2 h-full",
    tabitemcontainer: {
      base: "h-full overflow-auto"
    },
    tabpanel: "h-full",
    tablist: {
      variant: {
        fullWidth:
          "grid w-full grid-flow-col divide-x rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400"
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-1 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        variant: {
          fullWidth: {
            active: {
              on: "active rounded-none bg-gray-50 p-4 text-gray-900 dark:bg-gray-700 dark:text-white border-b-paletteColor3 border-b",
              off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
            }
          }
        }
      }
    }
  }
};
