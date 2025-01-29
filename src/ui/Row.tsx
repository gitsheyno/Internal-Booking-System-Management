import styled, { css } from "styled-components";

type PropTypes = {
  type: "horizantal" | "vertical";
};
const Row = styled.div<PropTypes>`
  display: flex;

  ${(props) =>
    props.type === "horizantal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
