import React from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
// import Prism from "prismjs";
// import 'prismjs/components/prism-json';

const oldJSON = require("./data/old.json");
const newJSON = require("./data/new.json");

export default function App() {
  // const highlightSyntax = (str) => (
  //   <pre
  //     style={{ display: "inline" }}
  //     class="foo"
  //     dangerouslySetInnerHTML={{
  //       // __html: Prism.highlight(str, Prism.languages.javascript)
  //       __html: Prism.highlight(str, Prism.languages.json, "json")
  //       // __html: str
  //     }}
  //   />
  // );
  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: "#6F767E",
        codeFoldBackground: "#E2E4E5"
      }
    }
  };
  return (
    <div className="App">
      <ReactDiffViewer
        oldValue={JSON.stringify(oldJSON, undefined, 4)}
        newValue={JSON.stringify(newJSON, undefined, 4)}
        splitView={true}
        compareMethod={DiffMethod.WORDS}
        styles={newStyles}
        leftTitle="Version A"
        rightTitle="Version B"
        // renderContent={highlightSyntax}
      />
    </div>
  );
}
