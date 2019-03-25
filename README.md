Simple Authentication with ExpressJS
-------------------------------------
This project help you understand some basic concept:
- ES6 with async/await (Replacement for  Promise)
- ExpressJS platform (Models, Routes, Controller)
- Passport-local login, Express-Session
    - How to signup, login with Passport-local
    - How to use Session in Express
- Database: Mongodb Cloud, mongo, mongoose
    - Use free cloud mongodb connect with mongoose
- Full function to login, register, add, delete, edit.
- Some problems I stuck and solved when learn about this, hope to helpful

#NODEJS Environment
-------------------------------------
Node version 8.11.1 because of it support ES6
https://nodejs.org/ja/blog/release/v8.11.1/

#Mongodb Environment for Practice
-------------------------------------
- Register a account at https://cloud.mongodb.com/ 
- Create a free mongodb
- At connection chose Nodejs version 2.2.12 or later to get connection string, something like this:
"mongodb://admin:<password>@nguyennt234-shard-00-00-i2lw1.mongodb.net:27017,nguyennt234-shard-00-01-i2lw1.mongodb.net:27017,nguyennt234-shard-00-02-i2lw1.mongodb.net:27017/test?ssl=true&replicaSet=nguyennt234-shard-0&authSource=admin&retryWrites=true";
[Guide Here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Setting_up_the_MongoDB_database)

#Environment Variable
--------------------------------------
At root project create ".env" file with content:
DB_CONFIG = Mongodb Connection String

#Run
--------------------------------------
Enter Termial: node app/server.js
Open browser enter: http://localhost:5000

#Problems I stuk & How to solve it
--------------------------------------
##1. Understand Passportjs
 - How to passportjs work
```
passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
```
 - How to use custom passportjs
Read: expressjs-authentication-simple\app\controllers\user.controller.js (loginUser, signupUser)


#Reference: 
--------------------------------------
##Session & Login

https://medium.com/@bmshamsnahid/node-js-authentication-using-passport-js-78386be1f518

https://github.com/bmshamsnahid/Passport-Local-Implementation

https://github.com/b0bbybaldi/Rent-All/blob/master/server.js

https://developer.mozilla.org/vi/docs/Learn/Server-side/Express_Nodejs/mongoose

https://github.com/jaredhanson/passport-local

##Other:

https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

https://github.com/Createdd/authenticationIntro

https://viblo.asia/p/su-dung-ejs-de-quan-ly-view-trong-node-app-RnB5peeGKPG

https://github.com/nghuuquyen/sociss-class-nodejs/tree/master/src/sociss-blog-v2

https://github.com/CodAffection/Node.js-Expess-MongoDB-CRUD

https://stackabuse.com/the-node-js-request-module/

https://codesquery.com/build-secure-nodejs-rest-api-using-json-web-token/?fbclid=IwAR0Es6NGo4W9GwkydkuBXppICXTcmbeEtxXyqaQwj_wDpLfRH71PIYkr46I

