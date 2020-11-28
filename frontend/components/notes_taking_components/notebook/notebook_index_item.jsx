import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchNotebooks, createNotebook, deleteNotebook} from '../../../actions/notebook_actions';


class NotebooksIndexItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        };
        this.actionDropdownClicked=this.actionDropdownClicked.bind(this)
    };
    
    // dropdown(){
    //     if(this.state.opend){
    //         return (
    //             <ul>
    //                 {/* <li className='more-actions-modal' onClick={this.props.openModal('moreActions')>Rename notebook</li> */}
    //                 <li>Delete notebook</li>
    //                 <li>Add new note</li>
    //             </ul>
    //         )
    //     }
    // }
    actionDropdownClicked(){
        if(this.state.opened){
            setTimeout(() => this.setState({opened: false}), 100);
        } else {
            this.setState({opened: true});
        }
        // refer to https://codepen.io/quafoo/pen/jONdwWG for toggle actions
    };



    render(){
        const {history, notebook} = this.props
        // console.log(notebook.id)
        return(
            //notebook name
            //number of notes in the notebook
            //creator's name
            //updated date
            //dropdown
            <tr className='table-area'>
                <td className='title-column'>
                    <button className='table-title' onClick={()=>history.push(`/notebooks/${notebook.id}/notes`)}>
                        {`${notebook.title}(${notebook.notes.length})`}
                    </button>
                </td >
                {/* <td className='notebook-dropdown'> */}
                    {/* toggle */}
                {/* </td> */}
                <td className='created-by'>
                    {this.props.users[notebook.user_id].email}
                </td>
                <td className='updated-at'>
                    {`${notebook.updated_at.toString().substring(0,10)} ${notebook.updated_at.toString().substring(12,19)}`}
                </td>
                {notebook.title!=='My First Notebook'?
                <td className='action-dropdown'>
                    <button className='more-actions-dots' onClick={this.actionDropdownClicked} onBlur={this.actionDropdownClicked}>•••</button>
                    {/* <button className='more-actions-arrow' onClick={this.setState({opened: true})} onBlur={this.setState({opened: false})}></button> */}
                    {this.state.opened?(
                        
                        <ul className='dots-menu'>
                            <li><button onClick={()=>{this.props.removeNotebook(notebook);this.actionDropdownClicked}}>Delete notebook</button></li>
                            <li><button>Add new note</button></li>
                        </ul>
                    ):null} 
                </td>
                :null}
            </tr>


        )
    }
}




const mSTP = (state, ownProps) => ({
    notebooks: Object.values(state.entities.notebooks),
    notes: ownProps.notebook.notes
});

const mDTP = (dispatch) => ({
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: (notebook) => dispatch(createNotebook(notebook)),
    deleteNotebook: notebookId => dispatch(deleteNotebook(notebookId)),
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mSTP, mDTP)(NotebooksIndexItem));