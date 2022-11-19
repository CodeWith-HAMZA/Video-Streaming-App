import {
  Avatar,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";

import { Link, useParams } from "react-router-dom";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import VideosBox from "./VideosBox";
import VideoCard from "./VideoCard";
const Video = () => {
  const { videoId } = useParams();
  const [VideoDetails, setVideoDetails] = useState(null);
  const [RelatedVideos, setRelatedVideos] = useState(null);

  useEffect(() => {
    (async () => {
      // * Channel Details
      const data = await FetchAPI(
        `videos?part=contentDetails,snippet,statistics&id=${videoId}`
      );
      console.log("Hey teher etiuhesou", data.items[0])
      setVideoDetails(data.items[0]);
      // console.log(data);
      // data.items[0].snippet.statistics.likeCount

      const relatedVideos = await FetchAPI(
        `search?part=id,snippet&relatedToVideoId=${"7ghhRHRP6t4"}&type=video&maxResults=${"10"}`
      );

      console.log("Hey there", relatedVideos.items);
      setRelatedVideos(relatedVideos.items);
    })();
  }, []);

  function convertNumberTo_StringWithCommaSeperator(givenNumber) {
    return givenNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // ? These Both Methods Works Same, Tell Me Which One You Would Use?? :)
  // if (!VideoDetails) return <>Loading...</>; // * [First One]
  return VideoDetails !== null ? ( // * [Second One], Personally I Prefer this To Acheive More "Readable-Code"
    <>
      <Container maxWidth="lg">
        <Stack flexDirection={"row"} gap={"1.8rem"}>
          <Box>
            <ReactPlayer
              className="react-player"
              controls={true}
              volume={true}
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width={"52rem"}
              height={"30rem"}
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
                color: "#acacac",
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
                  src={VideoDetails?.snippet?.thumbnails?.high?.url}
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
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{ color: "#fff", fontSize: "2.2rem", p: "1rem" }}
            >
              <strong>Related Videos</strong>
            </Typography>
            {/* {
              RelatedVideos.map((item)=> {
                console.log("Hey ", item)
              }
              )
            } */}
            {
              // RelatedVideos && RelatedVideos.map(elem => <VideoCard item={elem}/>)
              ""
            }
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
