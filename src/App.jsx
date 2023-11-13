import { useEffect } from "react";
import Navbar from "./components/utils/navbar";
import Sidebar from "./components/utils/sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";

const createColorId = (colorObj) => {
  if (colorObj) {
    return Object.keys(colorObj)
      ?.map((key) => `${key}:${colorObj[key]}`)
      .join(",");
  } else {
    return "";
  }
};

const isMisc = (value) => {
  switch (value) {
    case "FSM":
    case "FYP/ Thesis Evaluations":
      return true;
  }

  return false;
};

const DATA_OBJ = {
  timeSlots: {},
  allClasses: {},
  classes: [],
  sections: [],
  labTimeSlots: {},
  labs: [],
  miscs: {},
};

const getSheetData = () => {
  const GOOGLE_SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
  const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}?includeGridData=true&key=${GOOGLE_SHEETS_API_KEY}`
  )
    .then((response) => response.json())
    .then((sheetsData) => {
      // Get course labels/departments
      const labelRows = sheetsData?.sheets[1]?.data[0]?.rowData
        ?.slice(0, 4)
        ?.map((row) => row?.values)
        ?.map((row) =>
          row
            .slice(4)
            ?.filter((cell) => cell?.formattedValue)
            ?.map((cell) => ({
              ...cell,
              bgID: createColorId(cell?.effectiveFormat?.backgroundColor),
            }))
        );

      const classLabels = [];
      labelRows?.forEach((row) => {
        row?.forEach((cell) => {
          classLabels.push({
            bgID: cell?.bgID,
            label: cell?.formattedValue,
            classes: {},
          });
        });
      });

      const labLabels = [];
      labelRows?.forEach((row) => {
        row?.forEach((cell) => {
          labLabels.push({
            bgID: cell?.bgID,
            label: cell?.formattedValue,
            labs: {},
          });
        });
      });

      DATA_OBJ["classes"] = [...classLabels];
      DATA_OBJ["labs"] = [...labLabels];

      // Get time slots for each day
      const sheetNames = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ];
      const timeSlots = {};
      sheetsData?.sheets?.slice(1)?.forEach((sheet, index) => {
        timeSlots[sheetNames[index]] = sheet?.data[0]?.rowData[4]?.values
          ?.slice(1)
          ?.map((cell, index) => ({
            formattedValue: cell?.formattedValue,
            startIndex: index + 1,
          }))
          ?.filter((cell) => cell?.formattedValue);
      });

      DATA_OBJ["timeSlots"] = timeSlots;

      const labTimeSlots = {};
      sheetsData?.sheets?.slice(1)?.forEach((sheet, index) => {
        const rowData = sheet?.data[0]?.rowData;
        const labRowIdx = rowData?.findIndex(
          (i) => i.values[0]?.formattedValue?.toLowerCase() === "lab"
        );
        labTimeSlots[sheetNames[index]] = sheet?.data[0]?.rowData[
          labRowIdx
        ]?.values
          ?.slice(1)
          ?.map((cell, index) => ({
            formattedValue: cell?.formattedValue,
            startIndex: index + 1,
          }))
          ?.filter((cell) => cell?.formattedValue);
      });

      DATA_OBJ["labTimeSlots"] = labTimeSlots;

      // Get classes for each time slot
      const allClasses = {};
      const allLabs = {};
      sheetsData?.sheets?.slice(1)?.forEach((sheet, index) => {
        const day = sheetNames[index];

        DATA_OBJ.miscs[day] = [];

        const classesList = [];
        const rowData = sheet?.data[0]?.rowData;
        const labRowIdx = rowData?.findIndex(
          (i) => i.values[0]?.formattedValue?.toLowerCase() === "lab"
        );

        rowData?.slice(5, labRowIdx)?.forEach((row) => {
          DATA_OBJ.timeSlots[day]?.forEach((slot) => {
            const venue = row?.values[0]?.formattedValue;
            const cell = row?.values[slot?.startIndex];
            const colorID = createColorId(
              cell?.effectiveFormat?.backgroundColor
            );
            const classObj = {
              slot: slot?.formattedValue,
              formattedValue: cell?.formattedValue,
              label: DATA_OBJ.classes?.find((label) => label?.bgID === colorID)
                ?.label,
              venue,
              isMisc: isMisc(cell?.formattedValue),
              isLab: cell?.formattedValue?.toLowerCase()?.includes("lab"),
              section: cell?.formattedValue
                ?.slice(
                  cell?.formattedValue?.indexOf("(") + 1,
                  cell?.formattedValue?.indexOf(")")
                )
                ?.trim(),
            };
            if (classObj.isMisc) {
              DATA_OBJ.miscs[day].push(classObj);
            }
            classesList.push(classObj);
          });
        });

        const labsList = [];

        rowData?.slice(labRowIdx + 1)?.forEach((row) => {
          DATA_OBJ.labTimeSlots[day]?.forEach((slot) => {
            const venue = row?.values[0]?.formattedValue;
            const cell = row?.values[slot?.startIndex];
            const colorID = createColorId(
              cell?.effectiveFormat?.backgroundColor
            );
            const classObj = {
              slot: slot?.formattedValue,
              formattedValue: cell?.formattedValue,
              label: DATA_OBJ.classes?.find((label) => label?.bgID === colorID)
                ?.label,
              isMisc: isMisc(cell?.formattedValue),
              venue,
              isLab: cell?.formattedValue?.toLowerCase()?.includes("lab"),
              section: cell?.formattedValue
                ?.slice(
                  cell?.formattedValue?.indexOf("(") + 1,
                  cell?.formattedValue?.indexOf(")")
                )
                ?.trim(),
            };

            if (classObj.isMisc) {
              DATA_OBJ.miscs[day].push(classObj);
            }

            labsList.push(classObj);
          });
        });

        allClasses[day] = classesList;
        allLabs[day] = labsList;
      });

      DATA_OBJ["allClasses"] = allClasses;
      DATA_OBJ["allLabs"] = allLabs;

      // Get sections
      const allSections = [];

      sheetNames?.forEach((day) => {
        const sectionNames = allClasses[day]?.map((cl) => {
          const str = cl?.formattedValue;
          if (str) {
            const section = str
              ?.slice(str?.indexOf("(") + 1, str?.indexOf(")"))
              ?.trim();
            return { section, label: cl?.label };
          } else {
            return null;
          }
        });
        allSections.push(...sectionNames);
      });

      const validSections = allSections?.filter((section) => section);
      const uniqueSections = new Set(validSections);

      DATA_OBJ["sections"] = Array.from(uniqueSections);

      DATA_OBJ?.classes?.forEach((cl) => {
        DATA_OBJ?.sections
          ?.filter((s) => s?.label === cl?.label)
          ?.forEach((section) => {
            cl["classes"][section?.section] = {};
            sheetNames?.forEach((day) => {
              cl["classes"][section?.section][day] = allClasses[day]
                ?.filter(
                  (cls) =>
                    cls?.label === cl?.label &&
                    cls?.section === section?.section
                )
                ?.map((cl) => cl);
            });
          });
      });

      DATA_OBJ?.labs?.forEach((lab) => {
        DATA_OBJ?.sections
          ?.filter((s) => s?.label === lab?.label)
          ?.forEach((section) => {
            lab["labs"][section?.section] = {};
            sheetNames?.forEach((day) => {
              lab["labs"][section?.section][day] = allLabs[day]
                ?.filter(
                  (cl) =>
                    cl?.label === lab?.label && cl?.section === section?.section
                )
                ?.map((cl) => cl);
            });
          });
      });

      console.log(DATA_OBJ);
    })
    .catch((error) => console.log("Something went wrong: ", error));
};

function App() {
  useEffect(() => {
    getSheetData();
  }, []);

  return (
    <>
      <div className="wrapper flex">
        <Sidebar />
        <main className="flex-1">
          <Navbar />
          <div className="p-5">

          <Routes>
            <Route path="/" element={<h1>Login</h1>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={<h1>Not Found</h1>}/>
          </Routes>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
