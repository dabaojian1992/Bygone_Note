import React, {useState, useEffect, useContext} from 'react';
import {Editor} from './editor_using_hooks';
import {ACContext} from './../../root';
import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';
import {createTagging, deleteTagging, fetchTaggings} from '../../../actions/tagging_action';
import {useDispatch, useSelector} from "react-redux";
import {selectNoteIndexItem} from '../state_sharing';

const NoteIndexItems = ({handleClick, removeNote, note, notebooks, noteId, body, noteOpened}) => {
    let notebookTitle = '';

    let dispatch = useDispatch();
    let [title, setTitle] = useState(`${note.title}`);
    let [text, setText] = useState(`${note.body}`);
    let [loaded, setLoaded] = useState(false);
    let cleanedText = removingHTMLTags(text);
    let dummyTitle = title.slice();
    
    function changeTitle(title){
        setTitle(title);
    };

    function changeText(text){
        setText(text);
    };

    useEffect(()=> {
        dispatch(fetchTags()).then(()=>{
            setLoaded(true);
        });
        selectNoteIndexItem.receiveNoteOpen().subscribe(data=>{      
            if(parseInt(data) === noteId){
                handleClick(noteId);
            };
        });
    },[]);


    if(notebooks){
        notebooks.forEach((notebook) => {
            if(notebook.id === note.notebook_id){
                notebookTitle = notebook.title;
                return notebookTitle;
            };
        });
    };

    function removingHTMLTags(str){
        let res='';
        for(let i=0; i<str.length-1; i++){ 
            if(str[i] === '>' && str[i+1] !== '<'){
                for(let j = i+1; j<str.length; j++){
                    if(str[j] !== '<'){
                        res += str[j];
                    } else {
                        break;
                    }
                };
            };
        };
        return res; 
    };

    if(dummyTitle.length > 15) {
        dummyTitle = `${title.slice(0,15)}...`;
    } else if (dummyTitle.length < 1) { 
        dummyTitle = 'Untitled';
    };
    
    return (
        <div className="single-note-item" id={`note-${noteId}`}>
            <div onClick={()=>{handleClick(noteId)}} className="single-note-item-side" >
                <li className='note-list-index-items'>
                    <div className='list-header'>
                        {dummyTitle}
                    </div>
                    <div className='note-text'>
                        {cleanedText.length > 20 ? `${cleanedText.slice(0,20)}...` : cleanedText} 
                    </div>
                    <div className='time-since-created'>
                        {`created at ${note.created_at} ago`}
                    </div>
                    <div className='time-since-updated'>
                        {note.time_ago_updated}
                    </div>
                    <div className='note-delete-button' onClick={()=>removeNote(note)}>
                        <img src='https://win98icons.alexmeub.com/icons/png/recycle_bin_full-3.png'/>
                    </div>
                </li>
            </div>
            <div className='editor-container'>
                {loaded && note.id === noteOpened ?  
                            <Editor
                                notebookTitle={notebookTitle}
                                noteId={noteId}
                                body={body}
                                id={title}
                                changeTitle={changeTitle}
                                changeText={changeText}
                            /> : null}
            </div>
        </div>
    )

}
export default NoteIndexItems;