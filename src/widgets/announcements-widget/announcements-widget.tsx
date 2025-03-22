import { AnnouncementTab } from "@/entities/announcement/announcement-tab";
import announcement_tab from "/announcement_tab.png";

const mockAnnouncements = [
  {
    image: announcement_tab,
    name: "System Maintenance",
    description: "Our system will be under maintenance on March 15th.",
    onClick: () => alert("System Maintenance clicked"),
  },
  {
    image: announcement_tab,
    name: "New Feature Released",
    description: "Check out our latest feature to improve your experience!",
    onClick: () => alert("New Feature clicked"),
  },
  {
    image: announcement_tab,
    name: "Holiday Schedule",
    description: "View our adjusted hours for the upcoming holidays.",
    onClick: () => alert("Holiday Schedule clicked"),
  },
];

export const AnnouncementsWidget = () => {
  return (
    <>
      <span className="text-[20px] w-full text-black font-bold mt-8 mb-4 text-left">
        Последние объявления
      </span>
      <div className="w-full flex flex-col pb-8 overflow-x-hidden gap-4 overflow-y-auto max-h-[450px]">
        {mockAnnouncements.map((announcement, index) => (
          <AnnouncementTab key={index} {...announcement} />
        ))}
      </div>
    </>
  );
};
