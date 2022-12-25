import { CssBaseline } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context/Context";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import ChannelCard from "./ChannelCard";
import VideosBox from "./VideosBox";
const Channel = () => {
  const { setIsLoading, setTopLoadingProgress, MaxResults, Videos, setVideos } =
    useContext(Context);

  // * Getting The Channel-Id through [Slug]
  const { channelId } = useParams(); 

  const [ChannelDetails, setChannelDetails] = useState(null);
 
  useEffect(() => {
    (async () => {
      setTopLoadingProgress(10);

      // * Fetching The Given Channel-Details By Providing The "channelId"
      const channelDetails = await FetchAPI(
        `channels?part=snippet,statistics&id=${channelId}`
      );
      // console.log("this is tems", channelDetails.items[0]);
      setChannelDetails(channelDetails?.items[0]); // * Current-Channel-Details State

      // * Fetching The Given Channel-Videos By Providing Providing The "channelId"
      const channelVideos = await FetchAPI(
        `search?part=snippet,id&channelId=${channelId}&order=date&maxResults=${MaxResults}`
      );

      setTopLoadingProgress(100);

      setVideos(channelVideos); // * Current-Channel-Videos State
    })();
    
    console.log("DETAILS", ChannelDetails)
  }, [channelId]);

  const FetchNextChannelVideos = async (e) => {
    setIsLoading(true);

    // * Fetching [New-Items] Based On The Given-Next-Page-Token
    const data = await FetchAPI(
      `search?part=snippet,id&channelId=${channelId}&order=date&maxResults=${MaxResults}&pageToken=${Videos.nextPageToken}`
    );

    // * Manipulating The [Recently-Fetched-Video-Items] With The [All-Previous-Video-Items] By Appending Them With "Spread-Syntax"
    data.items = [...Videos.items, ...data.items];

    // * And then, Updating The [State-Variable]
    setVideos(data);

    // * Bottom-Circular-Progress-Bar, (To Fetch More-Video-Items-For-Next-Page)
    setIsLoading(false);
    // console.log("Channel Details", ChannelDetails)
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Stack>
          <Box
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(195,135,62,1) 0%, rgba(212,85,60,1) 16%, rgba(0,0,0,1) 100%)",
              maxWidth: "100%",
              height: "18rem",
            }}
          />

          {ChannelDetails && (
            <ChannelCard marginTop={"-5rem"} item={ChannelDetails} />
          )}
        </Stack>

        {/* // * Calling Video-Box-Component And Passing The Function (To Make fetch-Request And Getting Next-Page-Video-Items, and also Updating The Videos-State) */}

        {Videos && (
          <VideosBox showChannelCard={false} FetchMore_WithNextPageToken={FetchNextChannelVideos} />
        )}
      </Container>
    </Box>
  );
};

export default Channel;
