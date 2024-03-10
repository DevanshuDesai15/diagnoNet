import './App.css';
import UploadDoc from './components/UploadDoc';
import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';

function App() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          </IconButton>
          <Avatar alt="Cohere Health" src="https://coherehealth.com/wp-content/uploads/2020/07/Cohere_Logo@2x_Reverse.png" sx={{ width: 110, height: 40 }} variant='square' />
        </Toolbar>
      </AppBar>
      <UploadDoc />
    </div>
  )
}

export default App
