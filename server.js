const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contact');
const loggerMiddleware = require('./middleware/logger');

const port = 3000;
const hostname = '127.0.0.1';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use('/api', contactRoutes);


const connectToDB = async () =>
{
	try
	{
		await mongoose.connect('mongodb://localhost:27017/mydatabase');
		console.log('Connected to database');
	}
	catch (error)
	{
		console.error(error);
		process.exit(1);
	}
}

connectToDB();

app.listen(port, hostname, () =>
{
	console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static(path.join(__dirname, 'public')));