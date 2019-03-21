Cấu hình NODEJS (Môi trường tương thích)
Cài đặt bản nodejs 8.11.1 vì lý do tương thích với Firebase và ES6
https://nodejs.org/ja/blog/release/v8.11.1/

Hướng dẫn cấu hình Mongo
-------------------------------------
Vào https://cloud.mongodb.com/ đăng ký tài khoản và tạo CSDL, thay vào dbConfig tại server.js (Hướng dẫn chi tiết sau)
"mongodb://admin:<password>@nguyennt234-shard-00-00-i2lw1.mongodb.net:27017,nguyennt234-shard-00-01-i2lw1.mongodb.net:27017,nguyennt234-shard-00-02-i2lw1.mongodb.net:27017/test?ssl=true&replicaSet=nguyennt234-shard-0&authSource=admin&retryWrites=true";

Chạy thử
--------------------------------------
nodemon server.js

Bài 1: EJS
https://viblo.asia/p/su-dung-ejs-de-quan-ly-view-trong-node-app-RnB5peeGKPG

Bài 2: Session & Login
https://medium.com/@bmshamsnahid/node-js-authentication-using-passport-js-78386be1f518
https://github.com/bmshamsnahid/Passport-Local-Implementation
https://github.com/b0bbybaldi/Rent-All/blob/master/server.js
https://developer.mozilla.org/vi/docs/Learn/Server-side/Express_Nodejs/mongoose
https://github.com/jaredhanson/passport-local

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




Nguồn tài liệu tham khảo:
--------------------------------------
https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

https://github.com/Createdd/authenticationIntro

https://viblo.asia/p/su-dung-ejs-de-quan-ly-view-trong-node-app-RnB5peeGKPG

https://github.com/nghuuquyen/sociss-class-nodejs/tree/master/src/sociss-blog-v2

https://github.com/CodAffection/Node.js-Expess-MongoDB-CRUD

https://stackabuse.com/the-node-js-request-module/

https://codesquery.com/build-secure-nodejs-rest-api-using-json-web-token/?fbclid=IwAR0Es6NGo4W9GwkydkuBXppICXTcmbeEtxXyqaQwj_wDpLfRH71PIYkr46I

------------------------------------------


Câu hỏi cần giải quyết:

1. Phân biệt statics và instance Method Mongo