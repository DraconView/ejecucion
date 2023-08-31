import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

export default function CompararTextosConLibreria() {
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleChangeOldValue = (event) => {
    setOldValue(event.target.value);
  };

  const handleChangeNewValue = (event) => {
    setNewValue(event.target.value);
  };

  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: "#6F767E",
        codeFoldBackground: "#E2E4E5",
      },
    },
  };

  return (
    <div className="n">
      <div className="alineacionHorizontal">
      <textarea
        value={oldValue}
        onChange={handleChangeOldValue}
        placeholder="Version A"
        style={{ width: "50%", height: "400px" }}
      />
      <textarea
        value={newValue}
        onChange={handleChangeNewValue}
        placeholder="Version B"
        style={{ width: "50%", height: "400px" }}
      />
      </div>
      <ReactDiffViewer
        oldValue={oldValue}
        newValue={newValue}
        splitView={true}
        compareMethod={DiffMethod.WORDS}
        styles={newStyles}
        leftTitle="Version A"
        rightTitle="Version B"
      />
    </div>
  );
}
