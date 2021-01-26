import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';
import {openModal} from '../../../actions/modal_actions';
import {tagPadRegresh} from '../state_sharing';

export const TagItem = (props) => { 
    const taggings = useSelector(state => state.entities.taggings);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();





    
    return ( 
        <div>
            {props.title}
        </div>
    );

};