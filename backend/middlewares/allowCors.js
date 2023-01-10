const allowedCorsDomains = [
  'https://vvv.trialdomain.nomoredomains.club',
  'http://vvv.trialdomain.nomoredomains.club',
  'localhost:3000',
];

const allowedCors = {
  origin: allowedCorsDomains,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = {
  allowedCors,
};
