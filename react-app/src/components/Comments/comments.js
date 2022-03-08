import { useEffect, useState } from 'react';
import { addComment, editComment, deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Comments() {
    // const dispatch = useDispatch();
    const { cheatsheetId } = useParams();
    const cheatsheet = useSelector((state) => state?.cheatsheet[cheatsheetId]);
    const comments = cheatsheet && Object.values(cheatsheet?.comments);


    return (
        <div>
            <div>
                {comments?.map(comment => {
                    return (
                        <div className='comment-container' key={comment.id}>
                            <li className='comment'>
                                {comment.content}
                            </li>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Comments;
