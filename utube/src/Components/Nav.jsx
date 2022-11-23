import { Box, fontSize, Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchBar from "./SearchBar";
import { Padding } from "@mui/icons-material";
// import MenuIcon from '@mui/icons-material/Menu';
import { BsYoutube } from "react-icons/bs";
const Nav = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={"#241d1d"}
      p={"0.6rem 1rem"}
    >
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        to="/"
      >
        {/* <YouTubeIcon color="error" sx={{ fontSize: "3rem" }} /> */}

        <BsYoutube
          color="red"
          style={{
            backgroundColor: "#fff",
            fontSize: "2rem",
            padding: "0.2rem 0.14rem 0.14rem 0.14rem",
            width: "3rem",
            borderRadius: "21%",
            marginRight: "0.2rem"
          }}
        />

        <div
          style={{
            color: "#fff",
            fontSize: "1.7rem",
            fontWeight: "bold",
            paddingBottom: "0.3rem",
            transform: "rotateY(45deg)",
            marginLeft: "-0.7rem",
          }}
        >
          WeTube
        </div>
      </Link>

      <SearchBar />
    </Stack>
  );
};

export default Nav;
