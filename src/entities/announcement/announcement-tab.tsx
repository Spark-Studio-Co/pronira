interface IAnnouncementTab {
  image: string;
  name: string;
  description: string;
  onClick: () => void;
}

export const AnnouncementTab: React.FC<IAnnouncementTab> = ({
  image,
  name,
  description,
  onClick,
}) => {
  return (
    <div
      className="bg-gray-light flex rounded-[12px]  min-h-[150px]  relative max-h-[150px]"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-[171px] absolute  h-full" />
      <div className="flex flex-col pl-[190px] pr-4 p-4">
        <span className="text-main text-[18px] font-bold">{name}</span>
        <span className="text-black text-[13px] mt-[8px] w-[206px]">
          {description}
        </span>
      </div>
    </div>
  );
};
