/*
 * @Author: xianxian 1453706865@qq.com
 * @Date: 2024-03-13 23:42:52
 * @LastEditors: xianxian 1453706865@qq.com
 * @LastEditTime: 2024-03-14 00:01:56
 * @FilePath: \my_todoBoard\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
