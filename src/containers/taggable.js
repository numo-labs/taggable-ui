import { connect } from 'react-redux';
import TaggableUI from '../components/taggable-ui';

function mapStateToProps (state) {
  console.log(state);
  const { taggable: { tags } } = state;
  return {
    tags
  };
}

export default connect(mapStateToProps)(TaggableUI);
