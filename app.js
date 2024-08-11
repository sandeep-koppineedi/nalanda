 
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
// const typeDefs = require('./graphql/schema');
// const resolvers = require('./graphql/resolvers');

const app = express();
connectDB();

app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next middleware or route handler
});

// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
const borrowRoutes = require('./routes/borrowRoutes');

app.use('/api/borrow', borrowRoutes);

app.listen({ port: process.env.PORT || 5000 }, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

//const server = new ApolloServer({ typeDefs, resolvers });
// server.start().then(res => {
//     server.applyMiddleware({ app });
   
// });
