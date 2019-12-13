const validateUser = user => {
  let errors = [];

  if (!user.password || user.password.length < 4) {
    errors.push(
      `Please make sure your password is greater than 4 characters in length`
    );
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
};

module.exports = {
  validateUser
};
