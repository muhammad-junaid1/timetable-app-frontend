// eslint-disable-next-line react/prop-types
const ClassCard = ({ data = {} }) => {
  return (
    <div
      className={`flex justify-center floating shadow-2xl items-center flex-col py-16 rounded-[6px] class-card`}
    >
      <h1 className="mb-4">{data?.title}</h1>
      <p>{data?.slot}</p>
    </div>
  );
};

export default ClassCard;
