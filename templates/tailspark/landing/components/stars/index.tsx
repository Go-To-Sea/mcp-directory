import StarIcon from "../../assets/imgs/star.svg";

export default function () {
  return (
    <div className="flex flex-row">
      <span className="tags"></span>
      {Array.from({ length: 5 }).map((_, idx: number) => (
        <img
          key={idx}
          src={StarIcon.src}
          alt="star"
          className="mr-1.5 inline-block w-4 flex-none"
        />
      ))}
    </div>
  );
}
