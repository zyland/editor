import { toHtml } from "../dist/index.js"

const text =
`|
    - a [t.32]
    - b
|
    | b
    | c`

console.log(toHtml(text))