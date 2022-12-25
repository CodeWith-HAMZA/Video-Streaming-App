import {
  Avatar,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

import { Link, useParams } from "react-router-dom";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import VideoCard from "./VideoCard";
import Context from "../Context/Context";
import { useRef } from "react";

const Video = () => {
  const { TopLoadingProgress, setTopLoadingProgress } = useContext(Context);

  // * Getting "videoId" through the [Slug]
  const { videoId } = useParams();

  const [VideoDetails, setVideoDetails] = useState(null);
  const [RelatedVideos, setRelatedVideos] = useState(null);
  const [ChannelDetails, setChannelDetails] = useState(null);
  const showDescription = useRef(null);
  useEffect(() => {
    // console.log("Runnig Video USeefect")
    (async () => {
      setTopLoadingProgress(10);

      // * Calling Video-Details API By Providing The "videoId"
      const videoDetails = await FetchAPI(
        `videos?part=contentDetails,snippet,statistics&id=${videoId}`
      );
      console.log("VIDEOS DETAUILS ", videoDetails);
      setVideoDetails(videoDetails?.items[0]);
      // console.log(videoDetails.items[0].snippet.channelId)
      // console.log(data);

      // channelId -> videoDetails.items[0].snippet.channelId
      // * Fetching The Given Channel-Details By Providing The "channelId"
      const channelDetails = await FetchAPI(
        `channels?part=snippet,statistics&id=${videoDetails.items[0].snippet.channelId}`
      );
      console.log("channel details ", channelDetails);
      setChannelDetails(channelDetails.items[0]);

      // * Calling Related-Or-Suggested-Videos API By Providing The "videoId"
      const relatedVideos = await FetchAPI(
        `search?part=id,snippet&relatedToVideoId=${videoId}&type=video&maxResults=${"10"}`
      );

      console.log("Suggested Videos", relatedVideos);

      setRelatedVideos(relatedVideos.items);

      // * Loading-Progress-Finished
      setTopLoadingProgress(100);
    })();
  }, [videoId]);

  function convertNumberTo_StringWithCommaSeperator(givenNumber) {
    return givenNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // * Recognizing if the text is url or not...
  const URL_Regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

  // ? These Both Methods Works Same, Tell Me Which One You Would Use?? :)
  // if (!VideoDetails) return <>Loading...</>; // * [First One]
  return VideoDetails !== null ? ( // * [Second One], Personally I Prefer this To Acheive More "Readable-Code"
    <>
      <Container maxWidth="lg">
        <Stack flexDirection={{ mdmdlg: "row", md: "column" }} gap={"1.8rem"}>
          <Box
            sx={{
              width: {
                xs: "100%",
                mdmdlg: "52rem",
                // md: "100%",
                // smmd: "100%",
                // sm: "100%",
                // xssm: "100%",
              },

              // background: {
              //   xs: "red",
              //   xssm: "blue",
              //   sm: "green",
              //   smmd: "cyan",
              //   md: "pink",
              //   mdmdlg: "purple",
              //   mdlg: "brown",
              //   lg: "yellow",
              // },
            }}
          >
            <ReactPlayer
              className="react-player"
              controls={true}
              volume={true}
              playing={true}
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={"100%"}
              height= {"30rem"}
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "bolder",
                m: "1.4rem 0 0.4rem 0",
                width: "50rem",
              }}
              variant="h1"
            >
              {VideoDetails?.snippet?.title}
            </Typography>

            <Typography
              sx={{
                color: "#a6a6a6",
                fontSize: "0.86rem",
              }}
              variant="p"
            >
              {convertNumberTo_StringWithCommaSeperator(
                VideoDetails?.statistics?.viewCount
              )}{" "}
              Views
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "9rem",
              }}
            >
              {/* Channel-Link  */}
              <Link
                to={`/channel/${VideoDetails?.snippet?.channelId}`}
                style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
              >
                <Avatar
                  sx={{
                    mt: "1.2rem",
                    width: 48,
                    height: 48,
                    cursor: "pointer",
                  }}
                  alt="Remy Sharp"
                  src={ChannelDetails?.snippet?.thumbnails?.high?.url}
                />

                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    mt: "1.4rem",
                  }}
                  variant={"h2"}
                >
                  {VideoDetails?.snippet?.channelTitle}
                </Typography>
              </Link>

              <div>
                {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                  color: "#fff",
                }}
                >
                <Typography
                marginTop={"0.4rem"}
                marginRight={"-0.4rem"}
                  variant={"p"}
                  >
                  {343}
                  </Typography>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20rem",
                    color: "#fff",
                  }}
                  >
                  <ThumbUpRoundedIcon />
                  </Button>
                  <Button
                  sx={{
                    borderRadius: "20rem",
                    color: "#fff",
                    mr: "1rem",
                    ml: "0.6rem",
                  }}
                  >
                  <ThumbDownRoundedIcon />
                  </Button>
                </div> */}
              </div>
            </Box>
            <Paper
              id="Description"
              sx={{
                bgcolor: "#404040",
                mt: "1.2rem",
                cursor: "pointer",
                overflow: "hidden",
                lineHeight: "1.08rem",
                p: "0.8rem 0.6rem",
              }}
            >
              <Box sx={{ color: "#fff", transition: "0.3s" }}>
                <Typography
                  ref={showDescription}
                  sx={{
                    // * Showing Less Description-Text As The HEight Of The Element Is Less And The Remaining TExt Is Hidden,
                    // * Due To OverFlow-Property
                    height: "10.8rem",
                    transition: "0.3s",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    showDescription.current.style.height = "auto";
                    showDescription.current.style.cursor = "text";
                  }}
                >
                  <Typography sx={{ mb: 1 }}>
                    {" "}
                    <strong> Description:-</strong>{" "}
                  </Typography>
                  {VideoDetails?.snippet?.description
                    .split(" ")
                    .map((subStr) => {
                      if (URL_Regex.test(subStr)) {
                        return (
                          <a
                            style={{ color: "rgb(9, 163, 255)" }}
                            href={subStr}
                          >
                            {subStr}
                          </a>
                        );
                      }
                      return `${subStr} `;
                    })}
                  {/* {(showDescription.current.style.height === "10.8rem" &&
                    "...") || 
                    ""} */}
                </Typography>
                <Button variant="text" sx={{ color: "#fff" }}>
                  {" "}
                  <strong
                    onClick={() => {
                      showDescription.current.style.height =
                        showDescription.current.style.height === "auto"
                          ? "10.8rem"
                          : "auto";
                      showDescription.current.style.cursor =
                        showDescription.current.style.height === "auto"
                          ? "text"
                          : "pointer";
                      if (showDescription.current.style.height !== "auto") {
                        window.scrollTo({ top: 56, behavior: "smooth" });
                      }
                    }}
                  >
                    show more
                  </strong>{" "}
                </Button>
              </Box>
            </Paper>
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontSize: "2rem",
                p: "0.8rem 0.8rem 0.8rem 0",
              }}
            >
              <strong>Related Videos:-</strong>
            </Typography>
            {/* {
              RelatedVideos.map((item)=> {
                console.log("Hey ", item)
              }
              )
            } */}
            <Stack
              flexDirection={{ xs: "row" }}
              flexWrap={{ xs: "wrap" }}
              gap={{ xs: "1rem" }}
              justifyContent={{xs: "center"}}
            >
              {RelatedVideos &&
                RelatedVideos.map((elem) => <VideoCard item={elem} />)}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  ) : (
    <CircularProgress
      sx={{ display: "block", mx: "auto", my: "1.4rem", color: "#fff" }}
    />
  );
};

export default Video;
