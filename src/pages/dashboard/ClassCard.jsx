// eslint-disable-next-line react/prop-types
const ClassCard = ({ data = {} }) => {
  return (
    <div
      className={`flex justify-center floating shadow-2xl items-center flex-col py-16 rounded-[6px] class-card`}
    >
      <div className="bg-[#ffffff] rounded px-2.5 text-black text-sm ">C405</div>
      <h1 className="my-2">{data?.title}</h1>
      <p>{data?.slot}</p>
    </div>
  );
};

export default ClassCard;
