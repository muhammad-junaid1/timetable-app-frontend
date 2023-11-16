import { Box } from "@mui/material";
import ClassCard from "./ClassCard";

const ClassDetails = () => {
  return (
    <Box className={`relative`}>
      <ClassCard
        data={{
          title: "Data Structures",
          slot: "08:30-09:50",
        }}
      />
    </Box>
  );
};

export default ClassDetails;
