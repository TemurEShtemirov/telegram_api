import express from 'express';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import authRoutes from './routes/authRoutes.js';
import messageRoute from './routes/messageRoutes.js';
const app = express();

app.use(express.json());

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}



app.use( userRoutes);
app.use(channelRoutes);
app.use(groupRoutes);
app.use(authRoutes);
app.use( messageRoute);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
    next()
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
