import {connect} from 'react-redux';
import Greeting from './greeting'
import {logout} from '../../actions/session_actions'

const mSTP = (state) => {
    // debugger
    return {
        
        currentUser: state.entities.users[state.session.id]
        //how to use the object deconstructuring 
        //{session, entities: {users}}?
    }

};

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Greeting);