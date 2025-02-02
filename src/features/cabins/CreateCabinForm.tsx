import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import FormRowComponent from "../../ui/FormRow";

type NewCabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: FileList | null;
};

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, watch } =
    useForm<NewCabin>();

  const { errors } = formState;
  const regularPrice = watch("regularPrice");

  const queryQlient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newCabin: NewCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryQlient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (newCabin: NewCabin) => {
    if (newCabin.image) {
      const file = newCabin.image;
      mutate({ ...newCabin, image: file });
    }
  };

  const onError = (data) => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRowComponent
        label="Cabin name"
        error={errors.name?.message as string}
      >
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this field is requierd" })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Maximum capacity"
        error={errors.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Minimum value is 1" },
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Regular price"
        error={errors.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Minimum value is 1" },
          })}
        />
      </FormRowComponent>

      <FormRowComponent label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              (value !== undefined && value <= regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRowComponent>

      <FormRowComponent label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
          type="file"
        />
      </FormRowComponent>
      <FormRowComponent>
        <Button disabled={isPending} $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRowComponent>
    </Form>
  );
}

export default CreateCabinForm;
