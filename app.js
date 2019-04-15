const Hapi = require('hapi');
var Path = require('path');
const mongoose = require('mongoose');




// Init server and connection
const start = async () => {
    mongoose.connect('mongodb://localhost:/hapidb', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Create tast Model

const Task = mongoose.model('Task', {text:String});
const server = new Hapi.Server({
    port: 8000,
    host: 'localhost'
});

// Start Server


await server.register(require('inert'));
await server.register(require('vision'));

server.route({
    method: 'POST',
    path: '/tasks',
    handler: async (request, h) => {
       try{
        let text = request.payload.text;
        let newTask = new Task({text:text});
        newTask.save();
        return h.redirect().location('/tasks');
       }
       catch (err){
           return h.response(err).code(500);
       }

              
      
    }
});

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {

            return h.view('index', {
                name: 'Shell'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/tasks',
        handler: async (request, h) => {
           try{
            let tasks = await Task.find().exec();
            return h.view('task',{
                tasks:tasks
            });
           }
           catch (err){
               return h.response(err).code(500);
           }

                  
          
        }
    });

   

    server.route({
        method: 'GET',
        path: '/about',
        handler: function (request, h) {

            return h.file('./public/about.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/image',
        handler: function (request, h) {

            return h.file('./public/index.png');
        }
    });

    server.views({
        engines: {
            html: {
            module: require('handlebars'),
            compileMode: 'sync'
        }
        },
        relativeTo: __dirname,
        path: './views',
        compileMode: 'async'
    });


    await server.start();

    console.log('Server running at:', server.info.uri);
};

start().catch(error => console.error(error.stack));
