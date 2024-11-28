import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes } from '../redux/actions/quoteActions';
import { Button, Box } from '@mui/material';

const Pagination = () => {
  const dispatch = useDispatch();
  const { offset, limit, hasMore } = useSelector((state) => state.quotes);

  const loadMore = () => {
    dispatch(fetchQuotes(offset + limit, limit));
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Pagination count={10} color="primary" onClick={(e)=>console.log("page",e)
      }/>
      {hasMore && (
        <Button variant="contained" onClick={loadMore}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default Pagination;
