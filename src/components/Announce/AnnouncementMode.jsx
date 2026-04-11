import { useCallback, useEffect, useState } from "react";
import { getAnn } from "../../api/announcements/getAnn";
import { getDisplayOrder, saveDisplayOrder } from "../../api/displayOrder";
import { useNavigate } from "react-router-dom";
import { TiInfinityOutline } from "react-icons/ti";
import { LiaGripLinesSolid } from "react-icons/lia";
import DraggableLocalSection from "./DraggableLocalSection";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DraggableSection from "./DraggableSection";
import DraggableTransferSection from "./DraggableTransferSection";

const groupAndFilterAnnouncements = (announcements) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  
  
  const isThisWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date >= startOfWeek && date <= endOfWeek;
  };
  
  const grouped = {
    Conference: [],
    District: [],
    Local: [],
    Transfers: {
      firstReadingIn: [],
      firstReadingOut: [],
      secondReadingIn: [],
      secondReadingOut: [],
    },
  };

  
  announcements.forEach((ann) => {
    const announcementDate = ann.dateOfAnnouncement || ann.dateofAnnouncement;
    if (!isThisWeek(announcementDate) && !ann.is_recurring) return;
    
    if (ann.typeOfAnnouncement === "Conference") {
      grouped.Conference.push(ann);
    } else if (ann.typeOfAnnouncement === "District") {
      grouped.District.push(ann);
    } else if (ann.typeOfAnnouncement === "Local") {
      grouped.Local.push(ann);
    } else if (ann.typeOfAnnouncement === "Transfer") {
      const reading = ann.reading?.toLowerCase();
      const direction = ann.direction?.toLowerCase(); // "in" or "out"
      
      if (reading === "first") {
        grouped.Transfers[`firstReading${direction === "in" ? "In" : "Out"}`].push(ann);
      } else if (reading === "second") {
        grouped.Transfers[`secondReading${direction === "in" ? "In" : "Out"}`].push(ann);
      }
    }
  });
  
  const desiredLocalOrder = ["Afternoon Program","Keep Fit","Bible Studies","Midweek","Upcoming Programmes","Meetings","Funeral","Thanksgiving"," ", "Transfers"];
  
  const localGrouped = {};

  desiredLocalOrder.forEach((category) => {
    localGrouped[category] = [];
  });

  grouped.Local.forEach((ann) => {
    const match = desiredLocalOrder.find((category) =>
      ann.title?.toLowerCase().includes(category.toLowerCase())
    );
    if (match) {
      localGrouped[match].push(ann);
    } else {
      // Put unmatched ones under "Others" or something optional
      localGrouped["Others"] = localGrouped["Others"] || [];
      localGrouped["Others"].push(ann);
    }
  });

  grouped.Local = localGrouped;

  return grouped;
};


const Section = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl shadow p-6 mb-10">
      {/* Fancy title with icon-based line */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gray-300 mr-3 flex items-center justify-end">
          {/* Left line with repeated icon */}
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => (
              <TiInfinityOutline key={i} />
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-center text-gray-800 mx-4 whitespace-nowrap">
          {title}
        </h3>

        <div className="flex-1 h-px bg-gray-300 ml-3 flex items-center justify-start">
          {/* Right line with repeated icon */}
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => (
              <LiaGripLinesSolid key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Bullet announcements */}
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="bg-white rounded-md shadow-sm p-4">
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
            <p className="text-gray-700 mt-1 text-sm whitespace-pre-line">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TransferSection = ({ transfers }) => {
  if (!transfers) return null;

  const groups = [
    { title: "First Reading In", items: transfers.firstReadingIn || [] },
    { title: "First Reading Out", items: transfers.firstReadingOut || [] },
    { title: "Second Reading In", items: transfers.secondReadingIn || [] },
    { title: "Second Reading Out", items: transfers.secondReadingOut || [] },
  ];

  const hasAnyTransfers = groups.some((group) => group.items.length > 0);
  if (!hasAnyTransfers) return null;

  return (
    <div className="bg-gray-50 rounded-xl shadow p-6 mb-10">
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gray-300 mr-3 flex items-center justify-end">
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => (
              <TiInfinityOutline key={i} />
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-center text-gray-800 mx-4 whitespace-nowrap">
          Transfers
        </h3>

        <div className="flex-1 h-px bg-gray-300 ml-3 flex items-center justify-start">
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => (
              <LiaGripLinesSolid key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="text-base font-semibold text-gray-800 mb-3">{group.title}</h4>
            {group.items.length > 0 ? (
              <ul className="space-y-3">
                {group.items.map((item, index) => (
                  <li key={index} className="bg-white rounded-md shadow-sm p-4">
                    <h5 className="font-semibold text-gray-900">{item.title}</h5>
                    <p className="text-gray-700 mt-1 text-sm whitespace-pre-line">{item.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No items</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DEFAULT_SECTIONS = ["Conference", "District", "Local", "Transfers"];
const EMPTY_GROUPED_ANNOUNCEMENTS = {
  Conference: [],
  District: [],
  Local: {},
  Transfers: {
    firstReadingIn: [],
    firstReadingOut: [],
    secondReadingIn: [],
    secondReadingOut: [],
  },
};
export default function AnnouncementMode() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline  = () => setIsOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online",  goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online",  goOnline);
    };
  }, []);

  const [localCategories, setLocalCategories] = useState(() => {
    try {
      const stored = localStorage.getItem("localCategoryOrder");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  
  const [groupedAnnouncements, setGroupedAnnouncements] = useState(EMPTY_GROUPED_ANNOUNCEMENTS);
  const [sectionOrder, setSectionOrder] = useState(() => {
    try {
      const stored = localStorage.getItem("sectionOrder");
      return stored ? JSON.parse(stored) : DEFAULT_SECTIONS;
    } catch {
      return DEFAULT_SECTIONS;
    }
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadAnnouncements = useCallback(async () => {
    const all = await getAnn();
    setGroupedAnnouncements(groupAndFilterAnnouncements(all));
  }, []);

  const [itemOrders, setItemOrders] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      try {
        const [all, order] = await Promise.all([getAnn(), getDisplayOrder()]);
        if (!isMounted) return;
        setGroupedAnnouncements(groupAndFilterAnnouncements(all));
        if (order.localCategories) {
          setLocalCategories(order.localCategories);
          localStorage.setItem("localCategoryOrder", JSON.stringify(order.localCategories));
        }
        if (order.sections) {
          setSectionOrder(order.sections);
          localStorage.setItem("sectionOrder", JSON.stringify(order.sections));
        }
        if (order.itemOrders) setItemOrders(order.itemOrders);  
      } catch (err) {
        console.error("Failed to load:", err);
        if (isMounted) setGroupedAnnouncements(EMPTY_GROUPED_ANNOUNCEMENTS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAll();
    return () => { isMounted = false; };
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [moved] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, moved);
    return result;
  };

  const handleSectionDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // Top-level section reorder
    if (type === "DROPPABLE") {
      if (source.index === destination.index) return;
      const newOrder = Array.from(sectionOrder);
      const [moved] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, moved);
      setSectionOrder(newOrder);
      localStorage.setItem("sectionOrder", JSON.stringify(newOrder));
      saveDisplayOrder({ sections: newOrder });
      return;
    }

    // Item reorder within Conference or District
    if (source.droppableId === destination.droppableId) {
      const sectionName = source.droppableId; // e.g. "Conference"
      const currentItems = groupedAnnouncements[sectionName];
      if (!currentItems) return;

      const reordered = reorder(currentItems, source.index, destination.index);
      setGroupedAnnouncements(prev => ({ ...prev, [sectionName]: reordered }));

      const newItemIds = reordered.map((item) => item._id);
      setItemOrders(prev => ({ ...prev, [sectionName]: newItemIds }));
      saveDisplayOrder({ itemOrders: { [sectionName]: newItemIds } });
    }
  };
  if (loading) return <p className="text-center mt-10">Loading announcements...</p>;

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Announcements — {today}
      </h1>

      {isOffline && (
        <div className="text-center text-sm bg-yellow-100 text-yellow-800 py-2 px-4 rounded mb-4">
          You are offline — showing last saved announcements
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <DragDropContext onDragEnd={handleSectionDragEnd}>
          <Droppable droppableId="sections" type="DROPPABLE">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-10">
                {sectionOrder.map((sectionName, index) => (
                  <Draggable key={sectionName} draggableId={sectionName} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {sectionName === "Local" ? (
                          <DraggableLocalSection
                            localData={groupedAnnouncements.Local || {}}
                            itemOrders={itemOrders}
                            localCategories={localCategories}
                            onItemOrderChange={(key, ids) => {
                              setItemOrders(prev => ({ ...prev, [key]: ids }));
                              saveDisplayOrder({ itemOrders: { [key]: ids } });
                            }}
                          />
                        ) : sectionName === "Transfers" ? (
                          <DraggableTransferSection
                            transfers={groupedAnnouncements.Transfers}
                            itemOrders={itemOrders}
                            onItemOrderChange={(key, ids) => {
                              setItemOrders((prev) => ({ ...prev, [key]: ids }));
                              saveDisplayOrder({ itemOrders: { [key]: ids } });
                            }}
                          />
                        ): (
                          <DraggableSection
                            title={sectionName}
                            items={groupedAnnouncements?.[sectionName] || []}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/announcements")}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-900 transition"
        >
          ← Back to Announcements
        </button>
      </div>
    </div>
  );
}