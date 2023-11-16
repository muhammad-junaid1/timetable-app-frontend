import { Step, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaCheck, FaCheckCircle} from "react-icons/fa";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const steps = [
  "Pak Studies",
  "Discrete Mathematics",
  "Applied Physics",
  "IICT Lab",
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#3b77fd",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#3b77fd",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#3b77fd",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#3b77fd",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <FaCheckCircle size={24} className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const RealTimeSchedule = () => {
  return (
    <>
      <div className="mt-16">
        <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel style={{cursor: "pointer"}} StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
};

export default RealTimeSchedule;
