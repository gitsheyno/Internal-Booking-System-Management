import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import { useRecentBookings } from "../../hooks/useRecentBookings";
import { useRecentStays } from "../../hooks/useRecentStays";
import Spinner from "../../ui/Spinner";
export default function DashboardLayout() {
  const { isPending, bookings } = useRecentBookings();
  const { isPending: isPendingStays, stays, confirmedStays } = useRecentStays();

  if (isPending || isPendingStays) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <div>statistics</div>
      <div>Todays activities</div>
      <div>Stay duration</div>
      <div>sales</div>
    </StyledDashboardLayout>
  );
}
