import React, { useState, useEffect } from "react";
import { TiInfinityOutline } from "react-icons/ti";
import { LiaGripLinesSolid } from "react-icons/lia";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Helper to reorder array
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [moved] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, moved);
  return result;
};

// Styled group component
const StyledGroupSection = ({ title, announcements }) => (
  <div className="bg-gray-50 rounded-xl shadow p-6 mb-10">
    <div className="flex items-center justify-center mb-6">
      <div className="flex-1 h-px bg-gray-300 mr-3 flex items-center justify-end">
        <div className="flex space-x-1 text-gray-400">
          {[...Array(7)].map((_, i) => <TiInfinityOutline key={i} />)}
        </div>
      </div>
      <h3 className="text-xl font-bold text-center text-gray-800 mx-4 whitespace-nowrap">{title}</h3>
      <div className="flex-1 h-px bg-gray-300 ml-3 flex items-center justify-start">
        <div className="flex space-x-1 text-gray-400">
          {[...Array(7)].map((_, i) => <LiaGripLinesSolid key={i} />)}
        </div>
      </div>
    </div>

    <Droppable droppableId={title}>
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
          {announcements.map((item, index) => (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-white rounded-md shadow-sm p-4 cursor-move"
                >
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-gray-700 mt-1 text-sm whitespace-pre-line">{item.description}</p>
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

const LOCAL_STORAGE_KEY = "reorderedLocalAnnouncements";

const DraggableLocalSection = ({ localData }) => {
  const [orderedData, setOrderedData] = useState(localData);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);

      // Match saved order with fresh data (to avoid missing/extra items)
      const merged = {};
      for (const groupTitle in localData) {
        const savedIds = parsed[groupTitle]?.map((a) => a._id) || [];
        const original = localData[groupTitle];

        // Match saved order
        const ordered = savedIds
          .map(id => original.find(item => item._id === id))
          .filter(Boolean);

        // Append any new items not in savedIds
        const remaining = original.filter(item => !savedIds.includes(item._id));

        merged[groupTitle] = [...ordered, ...remaining];
      }
      setOrderedData(merged);
    } else {
      setOrderedData(localData);
    }
  }, [localData]);

  // Save to localStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) return;

    const updated = { ...orderedData };
    const reordered = reorder(updated[source.droppableId], source.index, destination.index);
    updated[source.droppableId] = reordered;
    setOrderedData(updated);
    saveToLocalStorage(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Local Announcements
      </h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(orderedData).map(([groupTitle, announcements]) =>
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
