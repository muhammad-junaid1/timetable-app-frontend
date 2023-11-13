// eslint-disable-next-line react/prop-types
const ClassCard = ({type, data = {}}) => {
    return <div className={`flex justify-center items-center flex-col py-16 rounded class-${type}`}>
        <h1>{data?.title}</h1>
        <p>{data?.slot}</p>
    </div>;
}

export default ClassCard;