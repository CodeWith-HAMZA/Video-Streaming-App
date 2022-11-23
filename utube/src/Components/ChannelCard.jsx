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

  // * Converts A Normal Long Number Into K, M, B
  const abbreviateNumber = (value) => {
    let newValue = value;
    if (value >= 1000) {
      let suffixes = ["", " K", "M", "B", "T"];
      let suffixNum = Math.floor(("" + value).length / 3);
      let shortValue = "";
      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  };

  // console.log("channel Item", item);
  // console.log(item.snippet.thumbnails.default.url)
  useEffect(() => {
    (async () => {
      const data = await FetchAPI(
        `channels?part=snippet,statistics&id=${item?.id?.channelId}`
      );
      console.log("Subs Count", data);
      setSubsCount(data.items[0].statistics.subscriberCount);
    })();
  });
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
            color: "rgb(154, 154, 154)",
            margin: "auto",
            textAlign: "center",
          }}
        >
          {abbreviateNumber(Number(SubsCount))} Subscribers
        </h4>
      </Link>
    </Stack>
  );
};

export default ChannelCard;
