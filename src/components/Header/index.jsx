// style
import style from './style.module.css'
import CustomButton from '../Button';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    getCurrentCategory, 
    getCurrentPage, 
    getPhotos, 
    setCurrentPage,
    setCurrentCategory
} from "../../features/photos/photosSlice"


function Header() {

    const dispatch = useDispatch();
    const currentCategory = useSelector(getCurrentCategory);
    const currentPage = useSelector(getCurrentPage)
    const photos = useSelector(getPhotos)

    return (
        <header className={style.headerContainer}>
            <CustomButton 
                text="Prev" 
                style={{bgcolor: "rgb(249, 251, 231)"}} 
                disabled={currentPage <= 1}
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            />
            <CustomButton 
                text="Category"
                style={{bgcolor: "rgb(236, 205, 180)", height: "30px"}}
                onClick={() => {
                    dispatch(setCurrentPage(1));
                    // dispatch(setCurrentCategory(.....)); TODO: popup with category to choose from. (animals, industry, computer, food, sports);
                }}
            />
            <CustomButton 
                text="Next"
                style={{bgcolor: "rgb(249, 251, 231)"}}
                disabled={photos.length / currentPage <= 9}
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            />
        </header>
    )
}

export default Header
