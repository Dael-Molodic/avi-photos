import Header from "./components/Header";
import Main from "./pages/Main";
import "./app.css"
import { useEffect } from "react";
import { getPhotosByPage, getCurrentPage } from "./features/photos/photosSlice";
import { useDispatch, useSelector } from "react-redux";



function App() {

  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage)

  useEffect(() => {
    dispatch(getPhotosByPage())
  }, [currentPage, dispatch])

  return (<div className="app-container">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
