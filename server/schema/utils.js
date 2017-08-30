const fetch = require('node-fetch');

const getData = async path => {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error);
  }
};

const addData = async (path, data) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(path, config);
    const res = await response.json();
    return res;
  } catch (error) {
    return new Error(error);
  }
};

const deleteData = async path => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(path, config);
    const res = await response.json();
    return res;
  } catch (error) {
    return new Error(error);
  }
};

// PATCH method will only merge existing props on the object with the new sent ones
// while UPDATE will blow the whole object and replace with data sent it
const editData = async (path, data) => {
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(path, config);
    const res = await response.json();
    return res;
  } catch (error) {
    return new Error(error);
  }
};

const baseUrl = 'http://localhost:8084';
exports.getUser = id => getData(`${baseUrl}/users/${id}`);
exports.getCompany = id => getData(`${baseUrl}/companies/${id}`);
exports.getUsersfromCompany = id => getData(`${baseUrl}/companies/${id}/users`);
exports.addUser = data => addData(`${baseUrl}/users`, data);
exports.deleteUser = id => deleteData(`${baseUrl}/users/${id}`);
exports.editUser = data => editData(`${baseUrl}/users/${data.id}`, data);
