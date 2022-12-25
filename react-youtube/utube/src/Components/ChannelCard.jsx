import { LensTwoTone, SettingsBluetoothSharp } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchAPI } from "../Utiles/FetchThroughAPI";

// * THIS COMPONENT IS USED IN BOTH PLACES,
// * 1. IN THE [SEARCH-Component]
// * 2. IN THE [FEED-Component]

const ChannelCard = ({ item, marginTop }) => {
  const [SubsCount, setSubsCount] = useState("");

   
 
  useEffect(() => {
    (async () => {
      // console.log("ITEM", item, typeof item?.id)

      // * Called By Feed-Component
      if(typeof item?.id === "object"){
        const data = await FetchAPI(
          `channels?part=snippet,statistics&id=${item?.id?.channelId}`
          );
          
          setSubsCount(await (data?.items[0]?.statistics?.subscriberCount));
          console.log("CHANNEL", data);
        } else{ 


          
          // * Called By Channel-Component (As-Avatar)
          setSubsCount(item?.statistics?.subscriberCount)
        }

    })();
  }, []);

  const abbreviategivenNumber = (givenNum) => {
    givenNum = givenNum.toString().replace(/[^0-9.]/g, "");
    if (givenNum < 1000) {
      return givenNum;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (givenNum >= si[index].v) {
        break;
      }
    }
    return (
      (givenNum / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  };

  return (
    <Stack
      // position={"relative"}
      // top={(isChannelHome && -85) || ""}
      mx={marginTop && "auto"}
      mt={marginTop || ""} // * it would work On The "Channel-Home-Page" when we pass top-margin through {{props}}
      sx={{ width: "280px" }}
      justifyContent="center"
      alignItems={"center"}
    >
      <Link
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        to={`/channel/${item.id.channelId || item.id}`} // * '||' means -> if {{first_one_fails}} then try {{second_one}}
      >
        {item && (
          <Avatar
            alt="Remy Sharp"
            src={item?.snippet?.thumbnails?.high?.url}
            sx={{ width: 160, height: 160, cursor: "pointer" }}
          />
        )}
        <h2
          style={{
            color: "#fff",
            margin: "1.1rem 0 0.64rem 0",
            textAlign: "center",
          }}
        >
          {item?.snippet?.title}
        </h2>
        <h4
          style={{
            color: "rgb(159, 159, 159)",
            margin: "auto",
            textAlign: "center",
            fontWeight: 'normal'
          }}
        >
          {abbreviategivenNumber(Number.parseInt(SubsCount))} Subscribers
        </h4>
      </Link>
    </Stack>
  );
};

export default ChannelCard;
