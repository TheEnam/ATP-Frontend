import React, { useState, useEffect } from "react";
import { TiInfinityOutline } from "react-icons/ti";
import { LiaGripLinesSolid } from "react-icons/lia";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { getDisplayOrder, saveDisplayOrder } from "../../api/displayOrder";

const ITEM_ORDER_KEY = "reorderedLocalAnnouncements";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [moved] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, moved);
  return result;
};

const StyledGroupSection = ({ title, announcements, dragHandleProps }) => (
  <div className="bg-gray-50 rounded-xl shadow p-6 mb-6">
    <div className="flex items-center justify-center mb-6">
      {/* Drag handle on the left */}
      <div
        {...dragHandleProps}
        className="cursor-grab active:cursor-grabbing p-1 mr-2 text-gray-400 hover:text-gray-600"
        title="Drag to reorder category"
      >
        ⠿
      </div>

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

    {/* Items within the category */}
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

const DraggableLocalSection = ({ localData }) => {
  const [orderedItems, setOrderedItems] = useState(localData);
  const [categoryOrder, setCategoryOrder] = useState(Object.keys(localData));

  // Sync item order from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ITEM_ORDER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const merged = {};
        for (const groupTitle in localData) {
          const savedIds = parsed[groupTitle]?.map((a) => a._id) || [];
          const original = localData[groupTitle];
          const ordered = savedIds.map(id => original.find(item => item._id === id)).filter(Boolean);
          const remaining = original.filter(item => !savedIds.includes(item._id));
          merged[groupTitle] = [...ordered, ...remaining];
        }
        setOrderedItems(merged);
      } else {
        setOrderedItems(localData);
      }
    } catch {
      setOrderedItems(localData);
    }
  }, [localData]);

  useEffect(() => {
    getDisplayOrder().then((order) => {
      if (order.localCategories) {
        const allKeys = Object.keys(localData);
        const merged = [
          ...order.localCategories.filter((k) => allKeys.includes(k)),
          ...allKeys.filter((k) => !order.localCategories.includes(k)),
        ];
        setCategoryOrder(merged);
      }
    });
  }, [localData]);

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // Reordering categories
    if (type === "CATEGORY") {
      if (source.index === destination.index) return;
      const newOrder = reorder(categoryOrder, source.index, destination.index);
      setCategoryOrder(newOrder);
      saveDisplayOrder({ localCategories: newOrder });
      return;
    }

    // Reordering items within a category
    if (source.droppableId !== destination.droppableId) return;
    const updated = { ...orderedItems };
    updated[source.droppableId] = reorder(updated[source.droppableId], source.index, destination.index);
    setOrderedItems(updated);
    localStorage.setItem(ITEM_ORDER_KEY, JSON.stringify(updated));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Local Announcements
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Outer droppable for category order */}
        <Droppable droppableId="local-categories" type="CATEGORY">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categoryOrder.map((groupTitle, index) => {
                const announcements = orderedItems[groupTitle];
                if (!announcements || announcements.length === 0) return null;
                return (
                  <Draggable key={groupTitle} draggableId={`cat-${groupTitle}`} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <StyledGroupSection
                          title={groupTitle}
                          announcements={announcements}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableLocalSection;