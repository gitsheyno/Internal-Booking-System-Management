import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin, editCabin } from "../../services/apiCabins";
import FormRowComponent from "../../ui/FormRow";
import { useMutationHandler } from "../../hooks/useMutateCabin";
type NewCabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: FileList | null;
};

type EditCabin = {
  created_at: string;
  description: string | null;
  discount: number | null;
  id: number;
  image?: string | null;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
};

function CreateCabinForm({ cabinToEdit }: { cabinToEdit?: EditCabin }) {
  if (cabinToEdit) {
    console.log("yes");
  } else {
    console.log("no");
  }

  const isEditSession = Boolean(cabinToEdit?.id);

  const { register, handleSubmit, reset, formState, watch } = useForm<
    NewCabin | EditCabin
  >({
    defaultValues: isEditSession && cabinToEdit ? { ...cabinToEdit } : {},
  });

  const { errors } = formState;
  const regularPrice = watch("regularPrice");

  const { mutate: createCabinMutation, isPending: isCreating } =
    useMutationHandler(
      createCabin,
      "Cabin created successfully",
      "Failed to create cabin",
      "cabin"
    );

  const { mutate: editCabinMutation, isPending: isEditing } =
    useMutationHandler(
      editCabin,
      "Cabin edited successfully",
      "Failed to edit cabin",
      "cabin"
    );

  const onSubmit = (newCabin: NewCabin | EditCabin) => {
    if (newCabin.image) {
      const file = newCabin.image;
      if (!isEditSession) {
        console.log("create");

        createCabinMutation({ ...newCabin, image: file } as NewCabin);
      } else {
        console.log("edit", (newCabin as EditCabin).id);
        editCabinMutation({
          ...newCabin,
          id: (newCabin as EditCabin).id,
        } as EditCabin);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
              (value !== undefined &&
                regularPrice !== null &&
                value !== null &&
                value <= regularPrice) ||
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
          {...register("image", {
            required: cabinToEdit?.id ? false : "This field is required",
          })}
          type="file"
        />
      </FormRowComponent>
      <FormRowComponent>
        <Button
          disabled={isCreating || isEditing}
          $variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRowComponent>
    </Form>
  );
}

export default CreateCabinForm;
