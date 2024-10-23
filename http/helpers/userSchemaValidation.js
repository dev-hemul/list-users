export const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      pattern: "^[a-zA-Zа-яА-ЯёЁ]+$" // Допустимы только буквы (русские и латинские)
    }
  },
  required: ["name"]
};
