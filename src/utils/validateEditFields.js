const validateEditFields = (user) => {
  const editableFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "gender",
    "about",
    "profilePhoto",
  ];
  const isEditValid = Object.keys(user).every((key) =>
    editableFields.includes(key)
  );
  return isEditValid;
};

module.exports = validateEditFields;
