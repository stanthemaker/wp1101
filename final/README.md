# backend packages installation

> cd hw7; mkdir backend
> cd backend; yarn init -y
> yarn add cors express nodemon mongoose ws
> yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-arrow-functions dotenv-defaults mongoose

# Add a .babelrc file under ./backend

{
"presets": [
"@babel/preset-env"
]
}

# Add to package.json

"scripts": {
"server": "nodemon server.js --ext js --exec babel-node"
},

# add in ./backend/package.json

"type": "module"
