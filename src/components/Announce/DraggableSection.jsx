import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TiInfinityOutline } from "react-icons/ti";
import { LiaGripLinesSolid } from "react-icons/lia";

const DraggableSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

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
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {items.map((item, index) => (
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
};

export default DraggableSection;