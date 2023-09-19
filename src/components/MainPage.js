import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
// import imageList  from "./imageList";
import axios from "axios";
import Spinner from "./Spinner";


export default function MainPage() {

  const [imageData, setImageData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState(false);

  const APIKey = "39525959-f994fd0eed6343ce54200241c";

  const url = `https://pixabay.com/api/?key=${APIKey}&q=yellow+flowers&image_type=photo&per_page=8`;


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

  console.log(edit);

  console.log(imageData);

  let gallery;

  if (loading) {
    gallery = <Spinner />
  }

  else if (!loading) {
    gallery =  (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="image">
          {(provided) => (
            <section 
              className={`gallery-container ${edit ? "edit-mode" : "grid-mode"}`}
              {...provided.droppableProps} 
              ref={provided.innerRef}
            >
              {imageData.map(({id, previewURL, tags}, index) => {
                return (
                  <Draggable key={id} index={index} draggableId={id.toString()}>
                    {(provided) => (
                        <img 
                          src={`${previewURL}`} 
                          alt={`${tags}`} 
                          className={`image ${edit ? "" : "grid-img"}`} 
                          ref={provided.innerRef} 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps}
                        />
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </section> 
          )}
        </Droppable>
      </DragDropContext> 
   );
  }

  return (
    <div className="main-page">
      <h1>Drag and Drop Images</h1>
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