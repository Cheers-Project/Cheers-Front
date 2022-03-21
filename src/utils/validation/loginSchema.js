import joi from 'joi';

const loginSchema = joi.object({
  userId: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  userPw: joi.string().required(),
});

export default loginSchema;
