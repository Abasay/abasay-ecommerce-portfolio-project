const randomNumber = () => {
  const random = Math.floor(Math.random() * 10) + 5;

  return 14 - random;
};

const randomPrice = () => {
  const random = Math.floor(Math.random() * 1000);

  return random;
};

module.exports = { randomNumber, randomPrice };
