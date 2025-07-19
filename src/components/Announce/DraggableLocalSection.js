import React from "react";
import { TiInfinityOutline } from "react-icons/ti";
import { LiaGripLinesSolid } from "react-icons/lia";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


// Styled section component reused for each local group
const StyledGroupSection = ({ title, announcements }) => {
  return (
    <div className="bg-gray-50 rounded-xl shadow p-6 mb-10">
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gray-300 mr-3 flex items-center justify-end">
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => <TiInfinityOutline key={i} />)}
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 mx-4 whitespace-nowrap">
          {title}
        </h3>
        <div className="flex-1 h-px bg-gray-300 ml-3 flex items-center justify-start">
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => <LiaGripLinesSolid key={i} />)}
          </div>
        </div>
      </div>

      <Droppable droppableId={title}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {announcements.map((item, index) => (
              <Draggable
                key={item._id}
                draggableId={item._id}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded-md shadow-sm p-4 cursor-move"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 mt-1 text-sm whitespace-pre-line">
                      {item.description}
                    </p>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

const DraggableLocalSection = ({ localData }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) return;

    // You can add reordering logic here if you want to persist changes
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Local Announcements
      </h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(localData).map(([groupTitle, announcements]) =>
          announcements.length > 0 ? (
            <StyledGroupSection
              key={groupTitle}
              title={groupTitle}
              announcements={announcements}
            />
          ) : null
        )}
      </DragDropContext>
    </div>
  );
};

export default DraggableLocalSection;
