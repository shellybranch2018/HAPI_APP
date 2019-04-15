# HAPI_APP
Hapi.js Framework Crash Course App

The app is based on the Youtube Video (https://www.youtube.com/watch?v=2lprC0yYeFw) - Hapi.js Framework Crash Course. 

The code demonstrated in the video is based on the older version of HAPI. If you were to follow along and build the app using his
code, you will run into errors after building your routes. This is because the routes no longer uses Reply in the handler. The latest version of HAPI requires using Async and Await for route handling. Please see the section on Routing in https://hapijs.com/tutorials/routing?lang=en_US. As a resource, here is another video that demonstrates setting routes using Async and Await, https://www.youtube.com/watch?v=f5W6FkuR-6U. These helped me to correct the errors and get the app working.

You can use this as a boiler plate app for other apps you want to create. This is a simple to-do list type of app with the following
features:

1) Uses HAPI with Handlebars for front-end viewing.
2) MongoDB database connection
3) Easy install with dependencies. Plug and play!
