import React from 'react';
import Modal from 'react-modal';
import { useHistory, useParams } from 'react-router';
import Post from './Post';
import './post.css';

// const postOverlay = {
//     overlay: {
//         position: 'fixed !important',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
//         zIndex: '1200 !important',
//         padding: '0 40px !important',
//         pointerEvents: 'auto'
//     }
// }


const PostModal = () => {
    const history = useHistory();
    const { postId } = useParams();

    return (
        <>
            <Modal
                isOpen
                // overlayClassName={postOverlay}
                overlayClassName="postOverlay"
                onRequestClose={() => history.goBack()}
                arialHideApp={false}
                style={{
                    content: {
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: 935,
                        width: '100%',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        margin: 0,
                        padding: 0,
                        overflow: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }
                }}
            >
                <Post postId={postId} />   
            </Modal>
            <div onClick={() => history.goBack()} style={{ 
                padding: 12,
                top: 0,
                right: 0,
                position: 'fixed',
                zIndex: 1201,
                cursor: 'pointer',
                border: 'solid'
             }}>
                <h1>X</h1>
            </div>
        </>
    )
}

export default PostModal;
