import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TiInfinityOutline } from "react-icons/ti";
import { LiaGripLinesSolid } from "react-icons/lia";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [moved] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, moved);
  return result;
};

const SUBSECTIONS = [
  { key: "firstReadingIn",   label: "First Reading — Transfer In" },
  { key: "firstReadingOut",  label: "First Reading — Transfer Out" },
  { key: "secondReadingIn",  label: "Second Reading — Transfer In" },
  { key: "secondReadingOut", label: "Second Reading — Transfer Out" },
];

const DraggableTransferSection = ({ transfers, itemOrders, onItemOrderChange }) => {
  const [orderedTransfers, setOrderedTransfers] = useState(transfers);

  // Apply saved order from server whenever transfers or itemOrders change
  useEffect(() => {
    if (!transfers) return;

    const updated = {};
    SUBSECTIONS.forEach(({ key }) => {
      const original = transfers[key] || [];
      const savedIds = itemOrders?.[key] || [];

      if (savedIds.length === 0) {
        updated[key] = original;
        return;
      }

      const ordered = savedIds
        .map((id) => original.find((item) => item._id === id))
        .filter(Boolean);
      const remaining = original.filter((item) => !savedIds.includes(item._id));
      updated[key] = [...ordered, ...remaining];
    });

    setOrderedTransfers(updated);
  }, [transfers, itemOrders]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) return;
    if (source.index === destination.index) return;

    const key = source.droppableId; // e.g. "firstReadingIn"
    const reordered = reorder(orderedTransfers[key], source.index, destination.index);

    setOrderedTransfers((prev) => ({ ...prev, [key]: reordered }));

    const newIds = reordered.map((item) => item._id);
    onItemOrderChange(key, newIds);
  };

  if (!transfers) return null;

  const hasAny = SUBSECTIONS.some(({ key }) => (transfers[key] || []).length > 0);
  if (!hasAny) return null;

  return (
    <div className="bg-gray-50 rounded-xl shadow p-6 mb-10">
      {/* Section title */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gray-300 mr-3 flex items-center justify-end">
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => <TiInfinityOutline key={i} />)}
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 mx-4 whitespace-nowrap">
          Transfers
        </h3>
        <div className="flex-1 h-px bg-gray-300 ml-3 flex items-center justify-start">
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => <LiaGripLinesSolid key={i} />)}
          </div>
        </div>
      </div>

      {/* Each subsection has its own DragDropContext */}
      <div className="space-y-6">
        {SUBSECTIONS.map(({ key, label }) => {
          const items = orderedTransfers?.[key] || [];
          if (items.length === 0) return null;

          return (
            <div key={key}>
              <h4 className="text-base font-semibold text-gray-800 mb-3">{label}</h4>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={key}>
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {items.map((item, index) => (
                        <Draggable key={item._id} draggableId={item._id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white rounded-md shadow-sm p-4 cursor-move"
                            >
                              <h5 className="font-semibold text-gray-900">{item.title}</h5>
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
              </DragDropContext>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DraggableTransferSection;