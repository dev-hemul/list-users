export const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      pattern: "^[a-zA-Zа-яА-ЯёЁ]+$" // Допустимі лише літери (російські та латинські)
    }
  },
  required: ["name"]
};
