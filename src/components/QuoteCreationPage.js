import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMedia, createQuote } from '../redux/actions/quoteActions';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setTokenData } from '../redux/actions/authActions';

const QuoteCreationPage = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const prevData = sessionStorage.getItem('token');
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const mediaUrl = await dispatch(uploadMedia(file));
      console.log("mediaUrl",mediaUrl);
      setImage(mediaUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && image) {
      dispatch(createQuote(text, image));
      navigate('/quotes');
    }
  };
  useEffect(()=>{
    if((!data.token || data.token == "") && !data.isAuthenticated){
      if(prevData && prevData != "") {
        dispatch(setTokenData(prevData))
      }else navigate('/');
    }
  },[data,prevData])
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Quote
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Quote Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {image && <Typography sx={{ mt: 2 }}>Image Uploaded!</Typography>}
          <Button type="submit"  fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default QuoteCreationPage;
