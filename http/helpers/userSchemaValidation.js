export const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      pattern: "^[a-zA-Zа-яА-ЯёЁіїєґІЇЄҐ]+$" // Допустимі лише літери (російські, українські та латинські)
    }
  },
  required: ["name"]
};
