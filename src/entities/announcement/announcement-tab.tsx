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
      className="bg-gray-light rounded-[12px] max-h-[150px]"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-[171px] h-full" />
      <div className="flex flex-col items-start py-4 pl-4">
        <span className="text-main text-[18px]">{name}</span>
        <span className="text-black text-[13px]">{description}</span>
      </div>
    </div>
  );
};
