import {lezer} from "@lezer/generator/rollup"
import typescript from "@rollup/plugin-typescript"

export default {
    input: "./src/index.js",
    output: [
        {
            format: "es",
            file: "./dist/index.js"
        }
    ],
    external: ["@lezer/lr", "@lezer/highlight"],
    plugins: [lezer(), typescript()]
}
