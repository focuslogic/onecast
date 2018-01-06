import React, { Component, Fragment } from 'react';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateCastPlayer, updateCastController } from 'stores/cast';
import { toggleFileBrowserDialog } from 'stores/file-browser';
import { toggleFullscreen } from 'stores/app';

import Cast from 'components/cast';
import FileBrowser from 'containers/file-browser/file-browser-component';
import VideoPlayer from 'containers/video-player/video-player-component';

fontawesome.library.add(solid, regular);

const LabelWrapper = styled.div`
  height: 100%;
  grid-row: 2;
  font-size: 2em;
  margin-top: -50px;
`;

const Label = styled.label`
  user-select: none;
  color: rgba(228, 228, 228, 1);
  background-color: rgba(23, 69, 124, 0.9);
  outline: none;
  border: none;
  border-radius: 5px;
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
    // Event listener for fullscreen change
    const { toggleFullscreen } = this.props;
    document.addEventListener('fullscreenchange', (e) => toggleFullscreen('fullscreen'));
    document.addEventListener('webkitfullscreenchange', (e) => toggleFullscreen('fullscreen'));
    document.addEventListener('mozfullscreenchange', (e) => toggleFullscreen('fullscreen'));
    document.addEventListener('msfullscreenchange', (e) => toggleFullscreen('fullscreen'));

    this.loadGoogleCastFramework();
  }

  loadGoogleCastFramework() {
    window['__onGCastApiAvailable'] = isAvailable => {
      if (isAvailable) this.initializeCastApi();
    };
    let script = document.createElement('script');
    script.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
    document.getElementById('root').appendChild(script);
  }

  initializeCastApi() {
    console.log('Initializing Google Cast');
    const { cast, chrome } = window;
    const { updateCastPlayer, updateCastController } = this.props;

    cast.framework.CastContext.getInstance().setOptions({
      // receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
      receiverApplicationId: '7DDC0933'
    }); 

    const player = new cast.framework.RemotePlayer();
    const controller = new cast.framework.RemotePlayerController(player);
    updateCastPlayer(player);
    updateCastController(controller);
  }
  
  render() {
    const { app, toggleFileBrowserDialog } = this.props;
    
    return (
      <Fragment>
        <Cast/>
        {app.isPlayerEnabled ? (<VideoPlayer isChromecast={app.isChromecast} />) : 
          (<LabelWrapper className='flex flex-center'>
            <Label onClick={toggleFileBrowserDialog}>Choose a Video</Label>
          </LabelWrapper>)}
        <FileBrowser />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ cast: state.cast, app: state.app });

const mapDispatchToProps = (dispatch) => ({ 
  updateCastPlayer: bindActionCreators(updateCastPlayer, dispatch),
  updateCastController: bindActionCreators(updateCastController, dispatch),
  toggleFileBrowserDialog: bindActionCreators(toggleFileBrowserDialog, dispatch),
  toggleFullscreen: bindActionCreators(toggleFullscreen, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
