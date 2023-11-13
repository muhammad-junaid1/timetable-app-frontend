import ClassCard from "./ClassCard";

const Dashboard = () => {
    return <div className="flex items-center relative justify-between mt-4">
        <ClassCard type="prev" data={{
            title: "Applied Physics", 
            slot: "08:30-09:50"
        }}/>
        <ClassCard type="current" data={{
            title: "Data Structures", 
            slot: "08:30-09:50"
        }}/>
        <ClassCard type="next" data={{
            title: "Pak Studies", 
            slot: "08:30-09:50"
        }}/>
    </div>
}

export default Dashboard;