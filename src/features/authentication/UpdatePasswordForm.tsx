import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUserInfo } from "../../hooks/useUploadUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm<{
    password: string;
    passwordConfirm: string;
  }>();
  const { errors } = formState;

  const { updateUserInfo, isPending } = useUpdateUserInfo();

  function onSubmit({ password }: { password: string }) {
    updateUserInfo({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isPending}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
