import { Box } from "@mui/material"
import ClassCard from "./ClassCard"

const RealTimeSchedule = () => {
    return   <Box
      className={`relative flex items-center justify-between mt-12` }
    >
        <ClassCard
        type="prev"
          data={{
            title: "Applied Physics",
            slot: "08:30-09:50",
          }}
        />
        <ClassCard
        type="current"
          data={{
            title: "Data Structures",
            slot: "08:30-09:50",
          }}
        />
        <ClassCard
        type="next"
          data={{
            title: "Pak Studies",
            slot: "08:30-09:50",
          }}
        />
    </Box>
}

export default RealTimeSchedule;