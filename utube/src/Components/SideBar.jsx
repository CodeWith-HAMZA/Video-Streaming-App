// import { Alert, Button, selectClasses, Typography } from '@mui/material';
import { Stack } from '@mui/system'
import React from 'react'
import { categories } from '../Utiles/constants'

const SideBar = ({ SelectedCategory, setSelectedCategory }) => {  // Accepting Categories-State-Variables



  return (

    <Stack
      id="SideBarContainer"
      flexDirection={'column'}
      justifyContent={'start'}
      width={{ lg: '14rem', xs: 'auto' }}
      // sx={{ background: { xs: 'red', sm: 'orange', md: 'yellow', lg: 'white', xl: 'cyan' } }}
      style={{ overflowY: 'scroll' }}
      height={'auto'}
      bgcolor={('rgb(57, 57, 57)')}
    >

      <Stack
        id="SideBar"
        flexDirection={{ lg: 'column', xs: 'row' }}
        justifyContent={'space-between'}
        alignItems={'space-between'} >

        {
          categories.map(
            category =>
              <button
                onClick={() => {
                  setSelectedCategory(category.name);
                }}
                className="sideBarBtn"
                key={category.name}
                style={{

                  // if SelectedCategory (state-variable) must be equal to 'category.name' category is a Constant-Array  
                  background: ((category.name === SelectedCategory) && '#86868652')
                    || ('rgb(57, 57, 57)')
                }}

              // onMouseEnter={(e) => {
              //   e.target.style.background = 'rgb(64, 64, 64)';
              //   setSelectedCategory("ReactJS")
              // }}
              // onMouseLeave={(e) => {
              //   e.target.style.background = 'rgb(57, 57, 57)';
              //   setSelectedCategory("ReactJS")
              // }}
              > {category.name} {category.icon} </button>

          )
        }

      </Stack>



    </Stack>
  );
};

export default SideBar;