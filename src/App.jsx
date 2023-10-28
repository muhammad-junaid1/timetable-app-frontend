import { useEffect } from "react";
import Navbar from "./components/utils/navbar";
import Sidebar from "./components/utils/sidebar";

function App() {
  useEffect(() => {
    const createColorId = (colorObj) => {
      if (colorObj) {
        return Object.keys(colorObj)
          ?.map((key) => `${key}:${colorObj[key]}`)
          .join(",");
      } else {
        return "";
      }
    };

    (async () => {
      try {
        const GOOGLE_SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
        const GOOGLE_SHEETS_API_KEY = import.meta.env
          .VITE_GOOGLE_SHEETS_API_KEY;
        const sheetsResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}?includeGridData=true&key=${GOOGLE_SHEETS_API_KEY}`
        );
        const sheetsData = await sheetsResponse.json();
        console.log(sheetsData);

        const DATA_OBJ = {
          timeSlots: {},
          classes: {},
          labels: [],
          sections: []
        };

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

        const labels = [];
        labelRows?.forEach((row) => {
          row?.forEach((cell) => {
            labels.push({
              bgID: cell?.bgID,
              label: cell?.formattedValue,
              classes: {},
            });
          });
        });

        // Get time slots for each day
        const timeSlots = {};
        const sheetNames = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ];
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
        DATA_OBJ["labels"] = labels;

        // Get classes for each time slot
        const allClasses = {};
        sheetsData?.sheets?.slice(1)?.forEach((sheet, index) => {
          const day = sheetNames[index];

          const classesList = [];
          sheet?.data[0]?.rowData?.slice(5)?.forEach((row) => {
            DATA_OBJ.timeSlots[day]?.forEach((slot) => {
              const venue = row?.values[0]?.formattedValue;
              const cell = row?.values[slot?.startIndex];
              const colorID = createColorId(
                cell?.effectiveFormat?.backgroundColor
              );
              const classObj = {
                slot: slot?.formattedValue,
                formattedValue: cell?.formattedValue,
                label: DATA_OBJ.labels?.find((label) => label?.bgID === colorID)
                  ?.label,
                venue,
                section: cell?.formattedValue?.slice(cell?.formattedValue?.indexOf("(") + 1, cell?.formattedValue?.indexOf(")"))?.trim()
              };
              classesList.push(classObj);
            });
          });
          allClasses[day] = classesList;
        });

        DATA_OBJ["classes"] = allClasses;

        // Get sections
        const allSections = [];

        sheetNames?.forEach((day) => {
          const sectionNames = allClasses[day]?.map((cl) => {
            const str = cl?.formattedValue; 
            if(str) {
              const section = str?.slice(str?.indexOf("(") + 1, str?.indexOf(")"))?.trim();
              return {section, label: cl?.label};
            } else {
              return null;
            }
          })
          allSections.push(...sectionNames);
        })

        const validSections = allSections?.filter((section) => section);
        const uniqueSections = new Set(validSections);
        
        DATA_OBJ["sections"] = Array.from(uniqueSections);


        DATA_OBJ?.labels?.forEach((label) => {
          DATA_OBJ?.sections?.filter(s => s?.label === label?.label)?.forEach((section) => {
              label["classes"][section?.section] = {};
              sheetNames?.forEach((day) => {
              label["classes"][section?.section][day] = allClasses[day]?.filter(
                (cl) => cl?.label === label?.label && cl?.section === section?.section
              )?.map((cl) => cl);
            })
          });
        });

        console.log(DATA_OBJ);
      } catch (error) {
        console.log("Error in fetching sheet data: " + error);
      }
    })();
  }, []);

  return (
    <>
      <div className="wrapper flex">
        <Sidebar />
        <main className="flex-1">
          <Navbar />
        </main>
      </div>
    </>
  );
}

export default App;
