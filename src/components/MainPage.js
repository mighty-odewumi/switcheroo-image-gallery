import { useEffect, useState, useRef } from "react";
// import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import axios from "axios";
import Spinner from "./Spinner";
import Search from "./Search";
import Card from "./Card";


export default function MainPage() {

  const [imageData, setImageData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState(false);

  const APIKey = "39525959-f994fd0eed6343ce54200241c";

  const [formData, setFormData] = useState({
    search: "",
  });

  const [error, setError] = useState(false);

  const url = `https://pixabay.com/api/?key=${APIKey}&q=parkour&image_type=photo&per_page=20`;


  // Fetch image data from Pexels API
  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response.data);
        setImageData(response.data.hits);
        setLoading(false);
      }).catch(error => {
        console.log(error.message);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Function called by the DragDropContext
  function handleDragEnd(result) {

    if (!result.destination) {
      return;
    }

    const items = Array.from(imageData);
    const [reOrderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);
    console.log("This is items", items);
    setImageData(items);
  }

  // function onChange(sourceId, sourceIndex, targetIndex, targetId) {
  //   const nextState = swap(imageData, sourceIndex, targetIndex);
  //   setImageData(nextState);
  // }

  // Function implemented to get around react-beautiful-dnd not supporting grids.
  function toggleEdit() {
    setEdit(!edit);
  }


  // Filters image from the list based on the tag
  function searchImage(searchInput) {
    const prevData = [...imageData];
    console.log(prevData);

    const filteredImages = imageData.filter(image => {
      const tag = image.tags.split(",")[0];
      return tag === searchInput.toLowerCase();
    });
    console.log(filteredImages);

    if (filteredImages.length !== 0) {
      setImageData(filteredImages);
      console.log(prevData);
    }
    
    else if (filteredImages.length === 0) {
      console.log("Image not found");
      setError(true);
    }
    console.log(prevData);
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  }

  console.log(formData);

  function handleSubmit(e) {
    e.preventDefault();
    searchImage(formData.search);
  }

  console.log(edit);

  console.log(imageData);

  let gallery;

  if (loading) {
    gallery = <Spinner />
  }

  else if (!loading) {
    gallery = (
      <Card 
        handleDragEnd={handleDragEnd}
        edit={edit}
        imageData={imageData}
      />
    )
  }

  if (error) {
    gallery = <p>Image not found</p>;
  }

  return (
    <div className="main-page">
      <h1>Switcheroo - Image Gallery</h1>

      <Search 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <button 
        className="toggle-btn"
        onClick={toggleEdit}
      >
        {edit ? "Go to Grid Mode" : "Go To Edit Mode"}
      </button>
      {gallery}
    </div>
  )
}


/* gallery =  (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="image">
          {(provided) => (
            <section 
              className={`gallery-container ${edit ? "edit-mode" : "grid-mode"}`}
              {...provided.droppableProps} 
              ref={provided.innerRef}
            >
              {imageData.map(({id, previewURL, tags}, index) => {
                const tag = tags.split(",")[0];
                console.log(tag);
                return (
                  <Draggable key={id} index={index} draggableId={id.toString()}>
                    {(provided) => (
                      <div 
                        className="img-container"
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                      >
                        <img 
                          src={`${previewURL}`} 
                          alt={`${tags}`} 
                          className={`image ${edit ? "" : "grid-img"}`} 
                        />
                        <span>{tag}</span>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </section> 
          )}
        </Droppable>
      </DragDropContext> 
   ); */

   
/*   <GridContextProvider onChange={onChange}>

        <GridDropZone
          id="images"
          boxesPerRow={2}
          rowHeight={200}
          style={{height: "400px"}}
        >
          {imageData.map((image, index) => {
            return (
              <GridItem
                key={image.id}
              >
                  <img src={image.previewURL} className="gri d-img"/>
              </GridItem>
            )
          })}

        </GridDropZone>
      </GridContextProvider> */
