// contacts.js - містить в собі методи обробки данних.
// По суті, ці методи - є функціями.

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// Отримуємо данні із файлу contacts.json.
// Створюємо абсолютний шлях до файлу із даними, які треба обробити.
const contactsPath = path.join(__dirname, "db/contacts.json");

// Створюємо методи обробки данних.
const getContactsList = async () => { 
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getById = async (id) => {
  const contacts = await getContactsList();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const addContact = async(data) => {
  const contacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    ... data,
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateById = async (id, data) => { 
  const contacts = await getContactsList();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) { 
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

const removeById = async (id) => {
  const contacts = await getContactsList();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) { 
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

// Створюємо дстуність методів обробки данних в інших файлах

module.exports = {
  getContactsList,
  getById,
  addContact,
  updateById,
  removeById,
};

// В разі використання "type": "module" в пакетному файлі,
// змінити звернення до внутрішніх пакетів Ноди - fs & path 
// і спосіб експорту методів, які обробляють данні:
// export default {
//   getContactsList,
//   getById,
//   addContact,
//   apdateById,
//   removeById
// };
