import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import router from 'next/router';
import axios from 'axios';

export default function AddForm() {
  const [image, setImage] = useState('https://fakeimg.pl/350x200/');
  const [saveImage, setSaveImage] = useState("");
  const [saveTitle, setSaveTitle] = useState("");
  const [saveContent, setSaveContent] = useState("");

  const [userData, setUserData] = useState({});
  useEffect(() => {
    // Perform localStorage action
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserData(userData);
    }
  }, []);

  const titleHandler = (e) => {
    const title = e.target.value;
    setSaveTitle(title);
  }
  
  const contentHandler = (e) => {
    const content = e.target.value;
    setSaveContent(content);
  }
  
  const handleUploadChange = (e) => {
    const uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
    console.log(uploaded)
  }
  
  const saveDataHandler = () => {
    const formData = new FormData();
    formData.append('title', saveTitle);
    formData.append('content', saveContent);
    formData.append('image', saveImage);
    formData.append('create_at', new Date().toISOString());
    let url = 'http://localhost:4400/api/master-data/articles';
    axios.post(url, formData
    ).then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.data;

      })
      router.push("/management/PostList");
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
        <TextField
          id="outlined-basic"
          label="Judul Artikel"
          variant="outlined"
          onChange={titleHandler}
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
          label="Konten Artikel"
          variant="outlined"
          onChange={contentHandler}
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
          <img src={image} className="img-thumbnail" alt="..."   />
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
        <Button variant="contained" component="label">
          Upload Gambar
          <input type="file" className="form-control" id="image" onChange={handleUploadChange} hidden required/>
        </Button>
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
          Tambah Artikel
        </Button>
      </Box>
    </>
  );
}
