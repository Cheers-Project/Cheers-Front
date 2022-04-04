import joi from 'joi';

const nicknameSchema = joi.object({
  nickname: joi.string().min(2).max(10).required(),
});

export default nicknameSchema;
