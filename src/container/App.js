import { connect } from 'react-redux';
import App from '../components/App';
import { postSthreeApi, postSpotApi, postComentApi } from '../api/postApi';
import { getSpotListApi, getSpotDetailApi, getComentsApi } from '../api/getApi';
import { withScriptjs } from 'react-google-maps';
import { spotList, spotDetail, coments, submitMessage } from '../actions/index';

const mapStateToProps = state => ({
  spotList: state.spotReducer,
  selectedSpot: state.spotReducer,
  coments: state.comentReducer,
  submitMessage: state.submitMessageReducer
});

const mapDispatchToProps = dispatch => ({
  createSpot: (imageData, spotInfo) => {
    postSthreeApi(imageData)
      .then(res => {
        spotInfo.photo_url = res.data;
        postSpotApi(spotInfo)
          .then(msg => dispatch(submitMessage(msg)))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  getSpotList: () => {
    getSpotListApi()
      .then(data => dispatch(spotList(data.spotList)))
      .catch(err => console.log(err));
  },
  getSpotDetail: spotId => {
    getSpotDetailApi(spotId)
      .then(data => dispatch(spotDetail(data.spot)))
      .catch(err => console.log(err));
  },
  inputComent: comentData => {
    postComentApi(comentData).then(data => dispatch(coments(data.comentList)));
  },
  getComents: spotId => {
    getComentsApi(spotId)
      .then(data => dispatch(coments(data.coments)))
      .catch(err => console.log(err));
  }
});

export default withScriptjs(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
