import React, { Component, Fragment } from 'react';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateCastPlayer, updateCastController } from './actions/cast';
import { toggleFileBrowserDialog } from './actions/file-browser';

import Cast from './components/cast';
import FileBrowser from './containers/file-browser/file-browser-component';
import VideoPlayer from './containers/video-player/video-player-component';

fontawesome.library.add(solid, regular);

const LabelWrapper = styled.div`
  height: 100%;
  grid-row: 2;
  font-size: 2em;
  margin-top: -50px;
`;

const Label = styled.label`
  user-select: none;
  color: #fefefe;
  background-color: #3f51b5;
  outline: none;
  border: none;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 0.6em 0.8em;
  margin: 0;
  cursor: pointer;
`;

class App extends Component {
  constructor(props) {
    super(props);
    
    this.loadGoogleCastFramework = this.loadGoogleCastFramework.bind(this);
    this.initializeCastApi = this.initializeCastApi.bind(this);
  }
  
  componentDidMount() {
    window['__onGCastApiAvailable'] = (isAvailable) => {
      if (isAvailable) {
        this.initializeCastApi();
      }
    };
    this.loadGoogleCastFramework();
  }

  loadGoogleCastFramework() {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
    document.querySelector('#root').appendChild(script);
  }

  initializeCastApi() {
    const { cast, chrome } = window;
    const { updateCastPlayer, updateCastController } = this.props;

    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    }); 

    const player = new cast.framework.RemotePlayer();
    const controller = new cast.framework.RemotePlayerController(player);
    updateCastPlayer(player);
    updateCastController(controller);
  }
  
  render() {
    const { player, fileBrowser, toggleFileBrowserDialog } = this.props;
    
    return (
      <Fragment>
        <Cast/>
        {fileBrowser.showDialog ? null : 
          (<LabelWrapper className='flex flex-center'>
            <Label onClick={toggleFileBrowserDialog}>Choose a Video</Label>
          </LabelWrapper>)}
        {player.showPlayer ? (<VideoPlayer />) : null}
        <FileBrowser />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ cast: state.cast, player: state.player, fileBrowser: state.fileBrowser });

const mapDispatchToProps = (dispatch) => ({ 
  updateCastPlayer: bindActionCreators(updateCastPlayer, dispatch),
  updateCastController: bindActionCreators(updateCastController, dispatch),
  toggleFileBrowserDialog: bindActionCreators(toggleFileBrowserDialog, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
