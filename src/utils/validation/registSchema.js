import joi from 'joi';

const registSchema = joi.object({
  userId: joi
    .string()
    .email({ tlds: { allow: ['com', 'net', 'kr'] } })
    .required(),
  userPw: joi
    .string()
    .pattern(
      new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$'),
    )
    .required(),
  repeatPw: joi.ref('userPw'),
  nickname: joi.string().min(2).max(10).required(),
  profileImg: joi.object(),
});

export default registSchema;
