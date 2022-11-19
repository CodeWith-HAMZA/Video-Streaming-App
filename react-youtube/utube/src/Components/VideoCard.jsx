import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchAPI } from "../Utiles/FetchThroughAPI";

const VideoCard = ({ item }) => {
  const [ChannelImg, setChannelImg] = useState(null)
  useEffect(() => {
    (async () => {
      const data = await FetchAPI(
        `channels?part=snippet,statistics&id=${item?.snippet?.channelId}`
      );
      console.log("in channalnt", data);
      // console.log(data.items[0].snippet.thumbnails.high.url)
      setChannelImg(data?.items[0]?.snippet?.thumbnails?.high?.url); 
      
    })();
  }, []);

  return (
    <Card sx={{ maxWidth: 270, bgcolor: "#312d2d", color: "#fff" }}>
      <CardActionArea>
        {/* Card Image */}
        <CardMedia
          component="img"
          height="140"
          width="100%"
          image={item?.snippet?.thumbnails?.high?.url} // '?.'if the key not found in the object, it won't throw (errors) instead, it would throw (undefind or null) value
          alt="green iguana"
        />
        <CardContent sx={{ px: "0.4rem" }}>
          {/* Video Card Title  */}
          <Typography
            gutterBottom
            sx={{
              display: "flex",
              gap: "0.6rem",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
            component="div"
          >
            <Avatar alt="Remy Sharp" src={ChannelImg} />
            {/* <img src="spn.gif" alt="" srcset="" style={{height:"4rem" ,width:"4rem" }}/> */}
            

            <span>
              {(item?.snippet?.title.length <= 41 && item?.snippet?.title) ||
                item?.snippet?.title.slice(0, 41) + "..."}
            </span>
          </Typography>

          {/* Video Card Description */}

          <Tooltip title={item?.snippet?.channelTitle} placement="top">
            <Link
              to={`/channel/${
                item?.snippet?.channelId || "Channel_Id_Not_Found"
              }`}
              className={"ChannnelName"}
            >
              {item?.snippet?.channelTitle}
            </Link>
          </Tooltip>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
