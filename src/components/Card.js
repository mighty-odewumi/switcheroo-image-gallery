import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export default function Card({handleDragEnd, edit, imageData}) {
  return (
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
   );
}
