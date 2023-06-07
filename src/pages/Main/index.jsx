// style
import style from './style.module.css'

// redux
import { useSelector } from 'react-redux';
import { getPhotos, getCurrentPage, getError, getIsLoading } from "../../features/photos/photosSlice"
import { Card, CardMedia, Typography } from '@mui/material';

function Main() {

    const photos = useSelector(getPhotos);
    const currentPage = useSelector(getCurrentPage);
    const photoError = useSelector(getError);
    const isLoadingPhoto = useSelector(getIsLoading);

    const currentPhotoRange = {
        start: (currentPage - 1) * 9,
        end: (currentPage - 1) * 9 + 9
    }

    if (photoError) return <div className={style.errorContainer}>{photoError}</div>

    return (<>
        <main className={style.MainContainer}>
            <div className={style.photoContainer}>
                {isLoadingPhoto
                ? <div>Loading photos.....</div>
                : photos
                    .slice(currentPhotoRange.start, currentPhotoRange.end)
                    .map(photo => {
                    return <Card 
                        key={photo.id}
                        sx={{  height: "30%", width: "30%", cursor: "pointer" }}
                    >
                        <CardMedia
                            component="img"
                            src={photo.largeImageURL}
                           
                        />
                    </Card>
                })}
            </div>
            <footer className={style.footer}>
                <Typography>
                    {`${currentPage} / ${Math.ceil(photos.length / 9)}`}
                </Typography>
            </footer>
        </main>
    </>)   
}

export default Main
