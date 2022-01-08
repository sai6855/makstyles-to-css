import "./styles.css";
import React, { useState } from "react";

const defaultStyle = {
  titleA: {
    fontFamily: "Arial",
    cursor: "pointer",
    borderRadius: "8px",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontWeight: "normal",
    fontSize: "calc(6px + 1.2vw)",
    textAlign: "center"
  },
  titleB: {
    fontFamily: "Arial",
    cursor: "pointer",
    borderRadius: "8px",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    fontWeight: "normal",
    fontSize: "calc(6px + 1.2vw)",
    margin: "auto",
    textAlign: "center"
  },
  w_half: {
    width: "50%"
  },
  line: {
    lineHeight: "52px"
  }
};
export default function App() {
  const [value, setVal] = useState(JSON.stringify(defaultStyle));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const val = JSON.parse(value);
        const arrayObj = [];

        if (val) {
          const keys = Object.keys(val);

          const camelToSnakeCase = (str) =>
            str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

          keys.forEach((key) => {
            const transformedStyle = Object.entries(val[key]).reduce(
              (acc, [styleKey, styleVal]) => ({
                ...acc,
                [camelToSnakeCase(styleKey)]: styleVal
              }),
              {}
            );

            arrayObj.push({ className: key, style: transformedStyle });
          });
        }

        let finalStr = "";

        arrayObj.forEach(({ className, style }) => {
          const styleStr = Object.entries(style).map(
            //eslint-disable-next-line
            (sty) => `${sty[0]}` + ":" + sty[1]
          );
          //eslint-disable-next-line
          finalStr =
            //eslint-disable-next-line
            finalStr + `.${className} {` + styleStr.join(";") + `}` + ";  ";
        });
        console.log(finalStr);
        navigator.clipboard.writeText(finalStr);
      }}
    >
      <button type="submit">copy</button>
      <textarea
        value={value}
        rows={30}
        cols={50}
        onChange={(e) => setVal(e.target.value)}
      />
    </form>
  );
}
