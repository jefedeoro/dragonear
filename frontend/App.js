import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import getConfig from './config'
// import { flexbox } from '@mui/system'
import { Pets, Extension, AddBoxRounded } from '@mui/icons-material'
import CardApp from './card/src/CardApp'
import {
  Box,
  Container,
  IconButtonClasses
} from '@mui/material'

import { MenuIcon } from '@material-ui/icons'
import { Icon } from '@material-ui/core'
import {
  Paper,
  Grid,
  Button,
  Checkbox,
  Card,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  FormControlLabel,
  makeStyles,
  ThemeProvider,
  createTheme
} from '@material-ui/core'
import { ButtonGroup } from '@mui/material'
import 'fontsource-roboto';
import { spacing } from '@material-ui/system'
import { CardMedia } from '@mui/material';
import ActionHome from 'material-ui/svg-icons/action/home';


const styles = {
    paperContainer: {
        backgroundImage: `url(${"https://bafybeielhmyq3uxbts5rhawx34k26wxsq6sasinytsokjwwaqafvgztksi.ipfs.dweb.link/photo_2021-09-16_01-58-55.jpg"})`
    }
};


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, rgb(201, 132, 87), #b2b41b)',
    border: 0,
    borderRadius: 60,
    color: 'secondary',
    padding: '15px 15px'
  }
})

const useStylesOut = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #b2b41b)',
    color: 'secondary',
  }
})

const theme = createTheme({
  style: {
    alignItems: "center",
    direction: "row", 
    alignItems: "center",
  },
  palette: {
    primary: {
      main: "#b2b41b",
    },
    secondary: {
      main: "rgb(201, 132, 87)",
    },
  },


})


function ButtonStyled() {
  const classes = useStyles();
  return <Button
    size="medium"
    color="inherit"
    onClick={() => alert('Sorry you do not have enough Dragon egg shards to make an egg yet.')}
    className={classes.root}>Create Eggs<br></br>from<br></br>Shards</Button>
}

function ButtonSignOut() {
  const classes = useStylesOut();
  return <Button
    color="transparent"
    onClick={login}
    className={classes.root}>Sign Out</Button>
}

const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, set_greeting] = React.useState()

  // // when the user has not yet interacted with the form, disable the button
  // const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {

        // window.contract is set by initContract in index.js
        window.contract.get_greeting({ account_id: window.accountId })
          .then(greetingFromContract => {
            set_greeting(greetingFromContract)
          })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        
        <h1>Welcome to DragonNEAR!</h1>
        <p>
          DragoNEAR is built upon the NEAR blockchain, you need to sign in to play.
          The button below will sign you in using NEAR Wallet.
          If you do not have a wallet it will walk you through the simple steps to get one.
        </p>
        <p>
          Do you have what it takes to be a DragoNEAR?
          Go ahead and click the button below to find out:
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <Button  onClick={login} color="primary">Sign in</Button>
        </p>
        
      </main>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.paperContainer} />
      <AppBar color="default" >
        
        <Grid container justifyContent="space-evenly" >
 
          <h2 item >DragoNEAR</h2>
          <ButtonSignOut item />  
          
        </Grid>
      </AppBar>
      <Container
        maxWidth="md"
      >
        <main className="App">


          <header className="App-header" >


            <ButtonStyled />
            <h3>Player 2's Dragon</h3>

            <Grid container justifyContent="space-evenly">

              <Grid item>
                <Paper onTouchMove="raised" style={{ height: 180, width: 120, }} />
              </Grid>
            </Grid>
            <br>
            </br>


            <Button
              startIcon={<Pets />}
              variant="contained"
              size="large"
              onClick={() => alert('Dragons Breeding. Egg will be awarded when they are finished.')}
              color="primary"
            >
              BREED
            </Button>
            <Button
              startIcon={<Extension />}
              variant="contained"
              size="large"
              onClick={() => alert('Dragons Battling. Winner is ...')}
              color="secondary"
            >
              BATTLE
            </Button>


            <h3>Your Dragons</h3>

            <Grid container justifyContent="space-evenly">
              <Grid item>
                <Card style={{ card="https://bafybeihpcn435xh6qpjlejd2d43tl4vuiic22udh744kvrg5hgtvietb2y.ipfs.dweb.link/blueDragoNEAR001.png", height: 180, width: 120, }} />
              </Grid>
              <Grid item>
                <Paper style={{ height: 180, width: 120, }} />
              </Grid>
              <Grid item>
                <Paper style={{ height: 180, width: 120, }} />
              </Grid>
            </Grid>

            <br>
            </br>
          </header>
          {showNotification && <Notification />}

        </main>
      </Container>
    </ThemeProvider>
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'set_greeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}

