import './App.css';
import UploadDoc from './components/UploadDoc';
import logo from '../src/assets/logo.png'
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

function App() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Avatar alt="Cohere Health" src={logo} sx={{ width: 80, height: 40 }} variant='square' />
          <Typography variant='h4'>DiagnoNet</Typography>
        </Toolbar>
      </AppBar>
      <UploadDoc />
    </div>
  )
}

export default App
