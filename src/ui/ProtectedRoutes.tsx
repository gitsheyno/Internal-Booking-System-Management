import { useUser } from "../features/authentication/useUserHook";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  if (isAuthenticated) return <>{children}</>;
}
