import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Stack } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import axios from 'axios';

export default function EditForm() {
  const { id } = useRouter().query;

  const [image, setImage] = useState('');
  const [saveTitle, setSaveTitle] = useState('');
  const [saveContent, setSaveContent] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4400/api/master-data/articles/${id}`)
      .then((res) => {
        const data = res.data;
        setImage(`http://localhost:4400/${data[0].image}`);
        setSaveTitle(data[0].title);
        setSaveContent(data[0].content);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log();

  }, []);

  const titleHandler = (e) => {
    const title = e.target.value;
    setSaveTitle(title);
    console.log(title);
  };

  const contentHandler = (e) => {
    const content = e.target.value;
    setSaveContent(content);
  };

  const saveDataHandler = (e) => {
    e.preventDefault();
    let url = `http://localhost:4400/api/master-data/articles/${id}`;
      axios
        .put(url, {
          title: saveTitle,
          content: saveContent
        })
        .then((res) => {
          if (res.status == 200) {
            setSuccessMsg('You Are Successfully Edit');
            setTimeout(() => {
              router.replace('/management/PostList');
            }, 3000);
          } else {
            setErrorMsg('Please Edit Title or Content');
            setTimeout(() => {
              router.reload();
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
  };

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
        <div>
              {successMsg && (
                <Stack sx={{ mx: 'auto', mb: 5, width: '40ch' }}>
                  <Alert severity="success" variant="filled">
                    {successMsg}
                  </Alert>
                </Stack>
              )}
              {errorMsg && (
                <Stack sx={{ mx: 'auto', mb: 5, width: '40ch' }}>
                  <Alert severity="error" variant="filled">
                    {errorMsg}
                  </Alert>
                </Stack>
              )}
            </div>
        <TextField
          id="outlined-multiline-static"
          multiline
          label="Article Title"
          variant="outlined"
          onChange={titleHandler}
          value={saveTitle}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-static"
          multiline
          label="Article Content"
          variant="outlined"
          onChange={contentHandler}
          value={saveContent}
        />
      </Box>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '75ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <img src={image} className="img-thumbnail" alt="..." width="500" height="500" />
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' }
        }}
        noValidate
        autoComplete="off"
      >
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
          onClick={saveDataHandler}
        >
          Edit Post
        </Button>
      </Box>
    </>
  );
}
