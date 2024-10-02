import React from "react";

const Test = () => {
  const drawElement = (ctx, data, rectHeight, strand) => {
    let lineBeginParameter = pageBeginPoint;
    let lineEndParameter = pageBeginPoint + pageRange - 1;
    const fontStyle = "8px serif";
    const fontColor = "black";
    console.log(
      "Current Row : ",
      row,
      lineBeginParameter,
      lineEndParameter,
      yValue
    );
    data?.forEach((element) => {
      // const text = element.SlNo;
      const text = element.Label.slice(-4);
      const color = element.color;

      /**DO NOT MOVE THE IF ELSE CASES */
      if (element.Begin >= lineEndParameter && element.End <= pageEndPoint) {
        row++;
        lineBeginParameter = lineEndParameter + 1;
        lineEndParameter = lineEndParameter + pageRange;
        yValue = gap * row;
        console.log(
          "Current Row : ",
          row,
          lineBeginParameter,
          lineEndParameter,
          yValue
        );
      }

      /**Create the rectangle from the previous rectangle */
      if (
        element.Begin <= lineBeginParameter &&
        element.End >= lineBeginParameter
      ) {
        console.log(
          "Previous Remaining Box : ",
          element.Begin,
          element.End,
          element.Label
        );
        let Begin = lineBeginParameter;
        let End = element.End;
        let rectWidth = End - Begin;
        rectWidth *= scaleFactor;
        xValue = 30;
        createBoxWithText(
          ctx,
          color,
          element.Strand,
          strand,
          xValue,
          yValue,
          rectWidth,
          rectHeight,
          text,
          element._id,
          fontColor,
          fontStyle
        );
      }

      /**create the rectangle normally here */
      if (
        element.Begin >= lineBeginParameter &&
        element.End <= lineEndParameter
      ) {
        console.log(
          "Normal Box : ",
          lineBeginParameter,
          element.Begin,
          element.End,
          lineEndParameter,
          element.Label
        );
        let rectWidth = element.End - element.Begin;
        rectWidth *= scaleFactor;
        let Begin = element.Begin % pageRange;
        xValue = Begin * scaleFactor;
        xValue = xValue + 30;
        //create the rectangle here.
        createBoxWithText(
          ctx,
          color,
          element.Strand,
          strand,
          xValue,
          yValue,
          rectWidth,
          rectHeight,
          text,
          element._id,
          fontColor,
          fontStyle
        );
      }

      /**create the rectangle with begin on current line and end on next line */
      if (
        element.Begin >= lineBeginParameter &&
        element.Begin <= lineEndParameter &&
        element.End >= lineEndParameter
      ) {
        console.log(
          "Box on current line : ",
          element.Begin,
          element.End,
          element.Label
        );
        //create the rectangle on current line
        let rectWidth = lineEndParameter - element.Begin;
        rectWidth *= scaleFactor;
        let Begin = element.Begin % pageRange;
        xValue = Begin * scaleFactor;
        xValue += 30;
        //create the rectangle here.
        createBoxWithText(
          ctx,
          color,
          element.Strand,
          strand,
          xValue,
          yValue,
          rectWidth,
          rectHeight,
          text,
          element._id,
          fontColor,
          fontStyle
        );

        //change the row
        if (element.End <= pageEndPoint) {
          row++;
          lineBeginParameter = lineEndParameter + 1;
          lineEndParameter = lineEndParameter + pageRange;
          yValue = gap * row;
          console.log(row, lineBeginParameter, lineEndParameter, yValue);
          console.log(
            "Remaining Box : ",
            element.Begin,
            element.End,
            element.Label
          );
          //and create the remaining part here
          let remBegin = 30;
          let remEnd = element.End - lineBeginParameter - 1;
          let remWidth = remEnd - remBegin;
          remWidth = remWidth * scaleFactor;
          xValue = remBegin;
          //create the rectangle here.
          createBoxWithText(
            ctx,
            color,
            element.Strand,
            strand,
            xValue,
            yValue,
            remWidth,
            rectHeight,
            text,
            element._id,
            fontColor,
            fontStyle
          );
        }
      }
    });
  };
  return <div>Test</div>;
};

export default Test;
