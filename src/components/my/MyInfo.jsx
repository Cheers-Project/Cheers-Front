import React from 'react';
import { useForm } from 'react-hook-form';

import Avatar from 'components/user/Avatar';

const MyInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Avatar register={register} preview />
      <button>프로필 변경</button>
    </form>
  );
};

export default MyInfo;
