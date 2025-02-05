import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSeetings } from "../../hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { useMutationHandler } from "../../hooks/useMutateCabin";
import { updateSetting } from "../../services/apiSettings";
function UpdateSettingsForm() {
  const { isPending, settings } = useSeetings();

  const { mutate, isPending: isUpdating } = useMutationHandler(
    updateSetting,
    "Settings updated successfully",
    "Failed to update settings",
    "settings"
  );

  if (isPending) {
    return <Spinner />;
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, name: string) => {
    console.log(e.target.value, e.target.id);
    const newSettings = {
      breakfastPrice: settings?.breakfastPrice ?? null,
      maxBookingLength: settings?.maxBookingLength ?? null,
      maxGuestsPerBooking: settings?.maxGuestsPerBooking ?? null,
      minimumBookingLength: settings?.minimumBookingLength ?? null,
      [name]: e.target.value,
    };

    mutate(newSettings);
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minimumBookingLength"
          defaultValue={settings?.minimumBookingLength ?? ""}
          onBlur={(e) => handleBlur(e, "minimumBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={settings?.maxBookingLength ?? ""}
          onBlur={(e) => handleBlur(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={settings?.maxGuestsPerBooking ?? ""}
          onBlur={(e) => handleBlur(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={settings?.breakfastPrice ?? ""}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
