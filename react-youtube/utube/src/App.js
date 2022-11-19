import { Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Feed from "./Components/Feed";
import Video from "./Components/Video";
import Channel from "./Components/Channel";
import Search from "./Components/Search";

// import axios from 'axios';
const App = () => {
  // const URL = "https://youtube-v31.p.rapidapi.com/search";
  // const options = {
  //   url: URL,
  //   params: {
  //     channelId: 'UCBVjMGOIkavEAhyqpxJ73Dw',
  //     maxResults: '50'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': 'cb4d985343msh98fc31738181d35p187ad7jsna914b1d64bd6',
  //     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  //   }
  // };

  // const func = async () => {
  //   const res = await axios.get(URL, options);
  //   console.log(res.data)
  // }
  // func()
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1300,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: " " }}>
        <Nav />
      </Box>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Feed />
            </>
          }
        />
        <Route exact path="/video/:videoId" element={<Video />} />
        <Route exact path="/channel/:channelId" element={<Channel />} />
        <Route exact path="/search/:searchString" element={<Search />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
