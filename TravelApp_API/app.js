const express = require('express');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();
app.use(bodyParser.json());
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes)




app.listen(5000);