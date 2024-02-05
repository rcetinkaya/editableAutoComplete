import React, { useEffect, useState } from 'react';
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest } from './reducers/dataReducer';
import { Avatar, Box, Checkbox, Grid, Paper, Typography } from '@mui/material';



function App() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state: any) => state.data);
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (data.length < 1) {
      dispatch(fetchDataRequest(inputValue));
    }
  }, [data]);
  const handleChange = (event: any, newValue: any) => {
    setSelectedOptions(newValue); 
  };

  const highlightText = (text: string, part: string) => {
    return (
      <>
        {text.split(new RegExp(`(${part})`, 'gi')).map((chunk, index) =>
          chunk.toLowerCase() === part.toLowerCase() ? <strong key={index}>{chunk}</strong> : chunk
        )}
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <Paper sx={{ width: "80%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
          <Grid container >
            <Grid item xs={6}>
              <Autocomplete
                fullWidth
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                value={selectedOptions}
                multiple={true}
                onChange={handleChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.location.name || ""}
                options={data}
                loading={loading}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderOption={(props, option,) => (
                  <li {...props} key={props.id}>
                    <Checkbox
                      style={{ marginRight: 8 }}
                      checked={selectedOptions.some((selectedOption: any) => selectedOption.id === option.id)}
                    />
                    <Avatar src={option.image} sx={{ marginRight: 2 }} />
                    <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start" textAlign="start">
                      <Typography fontSize={18} color="#475569">
                        {highlightText(option.location.name, inputValue)}
                      </Typography>
                      <Typography fontSize={14} color="#64748b">{option.episode.length} Episodes</Typography>
                    </Box>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            {
              selectedOptions.length > 0 &&
              <Grid item xs={6}  sx={{ backgroundColor: 'grey.900', color: 'grey.300', padding: 2, borderRadius: 1 }}>
              {selectedOptions.map((option:any, index:number) => (
                  <Box key={option.id} display="flex" alignItems="center" marginBottom={2}>
                    <Avatar src={option.image} sx={{ marginRight: 2 }} />
                    <Typography>{option.location.name}</Typography>
                  </Box>
                ))}
              </Grid>
            }
           

          </Grid>

        </Paper>
      </header>
    </div>
  );
}

export default App;
