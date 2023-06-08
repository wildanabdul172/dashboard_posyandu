import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

export default function AddUserForm() {
  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="NIK" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Full Name" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Departement" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Location" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Image" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '20ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          href="/management/PostList/addPost"
        >
          Create User
        </Button>
      </Box>
    </>
  );
}
