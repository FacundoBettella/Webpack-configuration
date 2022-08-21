const API = process.env.API;

const getData = async (id) => {
  const apiURl = id && `${API}${id}`;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;