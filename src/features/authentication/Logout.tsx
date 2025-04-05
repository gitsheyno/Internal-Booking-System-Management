import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "../../hooks/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { logoutMutate, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={() => logoutMutate()}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
