
import { Stack } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { FetchAPI } from '../Utiles/FetchThroughAPI';
import VideosBox from './VideosBox'
import Context from '../Context/Context';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Feed = () => {
  const { Videos, setVideos, MaxResults, setMaxResults, FetchVideosThroughSearch, SelectedCategory, setSelectedCategory } = useContext(Context);
  

  useEffect(() => {
    FetchVideosThroughSearch(SelectedCategory);

  }, [SelectedCategory]);
  console.log("this is videos", Videos)


  return (
    <Stack
      id="Feed"
      sx={{
        flexDirection: { lg: 'row', xs: 'column' },
        bgcolor: { xs: "#312d2d", sm: "#312d2d", md: "#312d2d", xl: "#312d2d" },
        color: '#fff',
      }}
    >

      {/* Side-Bar  */}
      <SideBar SelectedCategory={SelectedCategory} setSelectedCategory={setSelectedCategory} />


      {/* // * Videos-Container Passing Category & Videos(Containing API Fetched Data) States  */}
      <VideosBox SelectedCategory={SelectedCategory}   />

      {/* <Button onClick={ async ()=> {
        console.log("Button")
        // //  FetchVideosThroughSearch("Dear sir");
        const data  = await FetchAPI(`search?part=snippet&q=${SelectedCategory}&maxResults=${'50'}&pageToken=${Videos.nextPageToken}`)
        console.log("ONCLICK", Videos)
        console.log("ONCLICK",data)
        setVideos(data)
      }} sx={{textAlign: "center", color: "#fff" }}><KeyboardArrowDownIcon  /></Button> */}
      
      
    </Stack>
  )
}

export default Feed;