
import { Stack } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { FetchAPI } from '../Utiles/FetchThroughAPI';
import VideosBox from './VideosBox'
import Context from '../Context/Context';
const Feed = () => {
  const { Videos, FetchVideosThroughSearch, setVideos, SelectedCategory, setSelectedCategory } = useContext(Context);

  useEffect(() => {
    FetchVideosThroughSearch(SelectedCategory);
  }, [SelectedCategory]);

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


      {/* Videos-Container Passing Category & Videos(Containing API Fetched Data) States  */}
      <VideosBox SelectedCategory={SelectedCategory} Videos={Videos} />


    </Stack>
  )
}

export default Feed;