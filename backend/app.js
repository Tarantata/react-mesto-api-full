require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const NotFoundError = require('./errors/notFoundError');
const { errorHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCors } = require('./middlewares/allowCors');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(cors(allowedCors));

app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signup', validateCreateUser, createUser); // работает
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/cards', routerCard);
app.use('/users', routerUser);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB!');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} / Приложение запущено, используется порт ${PORT}.`);
  }); // приёмка сообщений с 3000 порта
});
