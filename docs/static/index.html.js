"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
const style = `
    * {
        padding: 0;
        margin: 0;
    }
    body {
        height: 100vh;
        width: 100%;
        background-image: linear-gradient(to right top, #232323, #1d1d1d, #171717, #101010, #070707);
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .logo {
        display: block;
        width: 8rem;
        height: 8rem;
    }
    .title {
        font-family: 'Georgia', sans-serif;
        font-weight: 800;
        font-size: 2rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        box-shadow: 3px 5px 3px rgba(0,0,0,0.3);
        padding: 0.5rem 0.8rem;
        border-radius: 5px;
    }
`;
exports.html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Message</title>
    </head>
    <body>
        <style>${style}</style>
        <h1 class="title">Server Message Working</h1>
    </body>
    </html>
`;
