# webpack 4 static website template

## Description
This is a boilerplate starter project featuring Webpack 4 bundler. The features include:
-  [x] Webpack Development & Production configurations
-  [x] Babel
-  [x] Sass
-  [x] Postcss with Autoprefixer
-  [x] Eslint
-  [x] Js, CSS minify
-  [x] Useful sass mixins libraries
-  [x] Simple production configurations in docker-compose file

## Dependencies

- Git
- Node.js the latest stable or LTS version.
- Bash to run the template's install.

## Usage for development
In the Linux terminal:

1. `export PROJECT_NAME=name` Replace 'name' with the name of your project and run.
2. Run `git clone https://github.com/roberto-araya/bt-webpack-template $PROJECT_NAME && cd $PROJECT_NAME`
3. Run `chmod +x install.sh && sh ./install.sh`
4. Start the development server using `npm run serve`
5. Open [http://localhost:9000](http://localhost:9000)

## Available Commands
- `npm run serve` - Run the live-reload development server
- `npm run build` - Build the production bundle

## Run production on Docker
The project include a docker-compose.yml file that will run a web service and will mount the production bundle. This can be used with [nginx-proxy](https://hub.docker.com/r/jwilder/nginx-proxy), and [letsencrypt-nginx-proxy-companion](https://hub.docker.com/r/jrcs/letsencrypt-nginx-proxy-companion/dockerfile/).

To use, in a machine o VM with Docker and Docker Compose, run `docker-compose up`

## Notes
The production and development configurations  are located in `wp.conf.prod.js` and `wp.conf.dev.js` respectively.

The configs use some common plugins and loaders. The development bundler also runs the `BundleAnalyzerPlugin`.

## License
Licensed under the MIT license.
