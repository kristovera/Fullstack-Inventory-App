export const USER_DATA_INIT = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  isSuperuser: false,
  isActive: false,
  role: "",
};

export const USER_FIELD_GUIDE = ["firstName", "lastName", "email", "password"];

export const USER_FIELD_VALIDATION = [
  "firstName",
  "lastName",
  "email",
  "password",
];

export const READ_USERS = 'read-users';
export const CREATE_USERS = 'create-users';
export const UPDATE_USERS = 'update-users';
export const DELETE_USERS = 'delete-users';
