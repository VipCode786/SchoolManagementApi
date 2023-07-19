// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const express = require('express');
// const router = express.Router();
 const glob = require('glob');
 const path = require('path');

// // Swagger options
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Your API Documentation',
//       version: '1.0.0',
//       description: 'API documentation using Swagger',
//     },
//   },
//   apis: getRouteFiles(), // Get the path to your route files dynamically
// };

// // Initialize Swagger
// const swaggerSpec = swaggerJsdoc(options);

// // Serve Swagger UI
// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Function to get the path to your route files dynamically
// function getRouteFiles() {
//   const routeFiles = glob.sync(path.join(__dirname, '../../routes/**/*.js'));
// //   '../route/**/route.js'
//   return routeFiles;
// }
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  // apis: getRouteFiles(),
  apis: ['routes/**/*.js'], // Adjust the path to match your route files
};

function getRouteFiles() {
  const routeFiles = glob.sync(path.join(__dirname, '../../routes/**/*.js'));
//   '../route/**/route.js'
  return routeFiles;
}
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

