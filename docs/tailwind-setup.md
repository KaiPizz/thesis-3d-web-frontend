tailwind.config.{js,cjs}:
module.exports = { content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"], theme:{extend:{}}, plugins:[] }
src/index.css:
@tailwind base; @tailwind components; @tailwind utilities;
