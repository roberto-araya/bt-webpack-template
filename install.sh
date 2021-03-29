#!/bin/bash
## Developed by Roberto Araya roberto.araya@btester.cl ##

# Get info from user. 
read -p "Enter the node package name [my_package]: " package_name
package_name=${package_name:-my_package}

read -p "Enter a node package description [my description]: " package_desc
package_desc=${package_desc:-my description}

read -p "Author [You <you@your-email.com>]: " package_author
package_author=${package_author:-You <you@your-email.com>}

read -p "Nginx Virtual Host [your-host.com]: " virtual_host
virtual_host=${virtual_host:-your-host.com>}

read -p "Letsencrypt email [you@your-email.com]: " email
email=${email:-you@your-email.com}

# Create the nginx configuration file.
cat > site.conf << EOF
server {
    index index.html;
    server_name ${package_name}.local;
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /build;
}
EOF

# Create the docker-compose file.
cat > docker-compose.yml << EOF
version: '2'

services:
    web:
        image: nginx:latest
        expose:
            - "80"
        environment:
            - VIRTUAL_HOST=$virtual_host
            - LETSENCRYPT_EMAIL=$email
            - LETSENCRYPT_HOST=$virtual_host
        volumes:
            - ./dist:/dist
            - ./site.conf:/etc/nginx/conf.d/default.conf
        networks:
            - $package_name
networks:
    $package_name:
        driver: bridge
EOF

# Create the node package.json file.
cat > package.json << EOF
{
  "name": "$package_name",
  "version": "1.0.0",
  "description": "$package_desc",
  "main": "src/app/index.js",
  "scripts": {
    "serve": "webpack-dev-server --history-api-fallback --progress --config wp.conf.dev.js",
    "build": "webpack --mode production --config wp.conf.prod.js"
  },
  "author": "$package_author",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.0",
    "@fortawesome/fontawesome-free": "^5.13.0",
    "animatewithsass": "^3.2.1",
    "autoprefixer": "^9.7.5",
    "babel-loader": "^8.1.0",
    "bourbon": "^7.0.0",
    "breakpoint-sass": "^2.7.1",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.4.2",
    "eslint": "^6.8.0",
    "eslint-loader": "^4.0.0",
    "family.scss": "^1.0.8",
    "file-loader": "^6.0.0",
    "html-loader": "^1.0.0",
    "html-webpack-loader": "0.0.5",
    "html-webpack-plugin": "^4.0.3",
    "mini-css-extract-plugin": "^0.9.0",
    "node-sass": "^4.13.1",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^8.0.2",
    "style-loader": "^1.1.3",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "url-loader": "^4.0.0",
    "webpack": "^4.42.1",
    "webpack-bundle-analyzer": "^3.6.1",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  },
  "dependencies": {
    "ajv": "^6.12.0",
    "minimal-analytics": "^0.1.15",
    "what-input": "^5.2.7"
  }
}
EOF

# Install node dependencies.
npm install

echo "      #################################################################################"
echo "      #   Node dependencies are installed.                                            #" 
echo "      #   Project created successfully!!!.                                            #"
echo "      #                                                                               #"
echo "      #   use 'npm audit fix' to fix vulnerabilities after node module installation.  #"
echo "      #   use 'npm run serve' to run the live-reload development server.              #"
echo "      #   use 'npm run build' to build the production bundle.                         #"
echo "      #                                                                               #"  
echo "      #################################################################################"