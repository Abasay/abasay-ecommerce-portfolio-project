const categoryHandler = async (url, category) => {
  const request = await fetch(url + category);
  const response = await request.json();
  return response;
};

const idHandler = async (url, id) => {
  const request = await fetch(url + id);
  const response = await request.json();

  return response;
};

module.exports = { categoryHandler, idHandler };
