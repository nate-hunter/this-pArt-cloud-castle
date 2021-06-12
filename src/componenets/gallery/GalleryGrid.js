import React from 'react';
import { getDefaultPost } from '../../data';
import GridPost from '../shared/GridPost';
import LoadingScreen from '../shared/LoadingScreen';



const GalleryGrid = () => {

    let loading = false;

    let posts = Array.from({ length: 20 }, () => getDefaultPost()).map(post => (
        <GridPost key={post.id} post={post} />
    ))

    return (
        <>
           <h2>Gallery...</h2>
           { loading ? <LoadingScreen /> : (
               <div>
                   {posts}
               </div>
           ) 
           }
        </>
    )
}

export default GalleryGrid;
