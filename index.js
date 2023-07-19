// index.js
// 1. Створюємо об'єкт - dataFromContacts, який отримує із іншого файлу (contacts.js)
// данні, оброблені відповідними методами.
// І данні і методи вже визначені в такому іншому файлі.

const dataFromContacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getContactsList":
      const allContacts = await dataFromContacts.getContactsList();
      return console.log(allContacts);

    case "getById":
      const selectContact = await dataFromContacts.getById(id);
      return console.log(selectContact);

    case "addContact":
      const newContact = await dataFromContacts.addContact({ name, email, phone });
      return console.log(newContact);
    
    case "updateById":
      const updateContact = await dataFromContacts.updateById(id, { name, email, phone });
      return console.log(updateContact);

    case "removeById":
      const removeContact = await dataFromContacts.removeById(id);
      return console.log(removeContact);
  }
}

// invokeAction({ action: "getContactsList" });
// invokeAction({ action: "getById", id: "05olLMgyVQdWRwgKfg5J6" });
// invokeAction({ action: "addContact", name: "Mango", email: "mango@gmail.com", phone: "322-22-22" });
// invokeAction({ action: "updateById", id: "iPqN4j1-XhczXT-ygQgST", name: "Mango", email: "mango@gmail.com", phone: "322-22-22" });
invokeAction({ action: "removeById", id: "qdggE76Jtbfd9eWJHrssH" });



