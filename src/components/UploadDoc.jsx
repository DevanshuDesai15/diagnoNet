import { useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, MenuItem, Select } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const UploadDoc = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [processedData, setProcessedData] = useState(null);
    const [selectedJsonFile, setSelectedJsonFile] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTextInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleJsonFileChange = (event) => {
        setSelectedJsonFile(event.target.value);
        console.log(event.target.value);
    };

    const handleUpload = () => {
        const formData = new FormData();

        if (selectedFile) {
            // Add the selected file to the FormData object
            formData.append('file', selectedFile);
        } else if (textInput) {
            // Add the text input to the FormData object
            formData.append('text', textInput);
        }

        // Add the selected option to the FormData object
        formData.append('option', selectedJsonFile);

        // Make a POST request to the Flask API
        axios.post('http://127.0.0.1:5000/api/post', formData)
            .then(response => {
                console.log(response.data);
                setProcessedData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div style={{ display: 'flex', marginTop: '70px', justifyContent: "center" }}>
            <Card sx={{ marginRight: '32px' }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center" direction="column">
                        <Grid item>
                            <Typography variant="h6">
                                Paste the Text or upload a file:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="text-input"
                                label="Text Input"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={textInput}
                                onChange={handleTextInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <input
                                accept=".txt"
                                id="contained-button-file"
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<CreateNewFolderIcon />}
                                    style={{ backgroundColor: '#039EC3' }}
                                >
                                    Browse
                                </Button>
                            </label>
                            {selectedFile && (
                                <Typography variant="subtitle1">
                                    {selectedFile.name}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item>
                            <Select
                                id="json-file-select"
                                value={selectedJsonFile}
                                onChange={handleJsonFileChange}
                                displayEmpty
                                style={{ minWidth: '200px' }}
                                required
                            >
                                <MenuItem value="" disabled>
                                    Select Model
                                </MenuItem>
                                <MenuItem value="database1">Model 1</MenuItem>
                                <MenuItem value="database2">Model 2</MenuItem>
                                <MenuItem value="database3">Model 3</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpload}
                                disabled={!selectedFile && !textInput || !selectedJsonFile}
                                startIcon={<CloudUploadIcon />}
                                style={{ backgroundColor: '#EA1D63' }}
                            >
                                Upload
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center" direction="column">
                        <Grid item>
                            <Typography variant="h4">
                                Processed Data
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Primary Diagnosis</TableCell>
                                            <TableCell style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Underlying Factors</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {processedData && processedData.list_of_primary_diagnosis.map((diagnosis, index) => (
                                            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent' }}>
                                                <TableCell>{diagnosis}</TableCell>
                                                <TableCell>{processedData.underlying_factors[index]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default UploadDoc;