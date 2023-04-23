import { styled } from "@stitches/react";

export const Container = styled("div", {
  display: "flex",
  gap: "7px",
  alignItems: "center",
});

export const Card = styled("div", {
  border: "solid 1px",
  borderRadius: "8px",
});

export const CardHeader = styled("div", {
  width: "100%",
  padding: "8px 20px",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "solid 1px #ddd",
});

export const HeaderAction = styled("div", {
  display: "flex",
  gap: "6px",
  alignItems: "center",
});

export const CardBody = styled("div", {
  padding: "0",
  overflowY: "auto",
});

export const ListContent = styled("label", {
  display: "flex",
  gap: "8px",
  "&:hover": {
    backgroundColor: "#eee",
    cursor: "pointer",
  },
  padding: "4px 20px",
  alignItems: "center",
});

export const EmptyData = styled("div", {
  padding: "50px 0",
  margin: "auto 0",
  textAlign: "center",
});

export const TransferActionButtons = styled("div", {
  display: "flex",
  gap: "8px",
  flexDirection: "column",
});

export const TransferButton = styled("button", {
  padding: "8px",
  display: "flex",
  gap: "4px",
  alignItems: "center",
  fontSize: "13px",
  borderRadius: "6px",
  "&:disabled": {
    opacity: ".5",
  },
});

export const SearchContainer = styled("div", {
  width: "100%",
  padding: "12px 20px",
});

export const SearchInput = styled("input", {
  outline: "none",
  width: "100%",
  lineHeight: 1.5,
  color: "rgba(0,0,0,.88)",
  display: "inline-flex",
  margin: "auto",
  borderRadius: "6px",
  fontSize: "14px",
});

export const FormControl = styled("div", {
  width: "100%",
  border: "solid 1px #ccc",
  borderRadius: "6px",
  display: "flex",
  padding: "4px 11px",
  alignItems: "center",
  transition: "linear .3s all",
  gap: 5,
  "&:hover": {
    borderColor: "#069DAD",
    transition: "linear .3s all",
  },
});

export const Input = styled("input", {
  position: "relative",
  width: "16px",
  height: "16px",
  borderRadius: "4px",
  appearance: "none",
  boxShadow: "inset 0 0 0 1px #ddd",
  "&:checked": {
    backgroundColor: "hsl(210 100% 66.1%)",
    boxShadow: "inset 0 0 0 1px hsl(210 100% 66.1%)",
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: "white",
    },
  },
  "&:hover": {
    cursor: "pointer",
  },
});
