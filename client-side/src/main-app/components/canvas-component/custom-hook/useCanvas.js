import { useEffect, useRef } from "react";
import { serverGetTheGeneData } from "../../../services/mainAppApiCallConstants";
import { useDispatch } from "react-redux";
import { setToggleDialogBox } from "../../../../state-management/feature/elementReducer";
import { setDialogGeneData, setGeneData } from "../../../../state-management/feature/dataReducer";


// Helper function to format numbers (e.g., 10000 -> 10k, 56400 -> 56.4k)
const formatNumber = (num) => {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 2) + "k";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 2) + "M";
  }
  return num.toString();
};



const useCanvas = (props) => {
  const dispatch = useDispatch();
  const { data, rectHeight, height, width, slideBegin, slideEnd, strand } =
    props;
  const pageBeginPoint = slideBegin;
  const pageEndPoint = slideEnd;
  let pageRange = pageEndPoint - pageBeginPoint + 1;
  pageRange = pageRange / 10;

  const scaleFactor = (width - 60) / pageRange;
  //console.log(scaleFactor);
  const gap = height / 11;
  let yValue = gap; //vertical values
  let xValue = 0;
  let row = 1;

  const rectangles = useRef([]); // Store rectangles data here

  /**
   *  This function will draw the line for the boxes
   * @param {context} ctx
   * @param {*} width
   * @param {*} height
   */
  const drawHorizontalLine = (
    ctx,
    width,
    height,
    canvasPageBeginPoint,
    canvasPageEndPoint
  ) => {
    let range = canvasPageEndPoint - canvasPageBeginPoint + 1;
    range = range / 10;
    let y_point = height / 11;
    const gap = y_point;
    let canvasBeginParameter = canvasPageBeginPoint;
    let canvasEndParameter = canvasPageBeginPoint + range - 1;
    for (let i = 1; i <= 10; i++) {
      y_point = i * gap;

      // // Format the parameters for better readability
      // const formattedEndParam = formatNumber(canvasEndParameter);

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.font = "8px serif";
      //line Begin point coordinate
      ctx.moveTo(0 + 30, y_point);
      //line Begin point parameter
      ctx.fillText(canvasBeginParameter, 0, y_point + 3);
      //line End point coordinate
      ctx.lineTo(width - 30, y_point);
      //line End point parameter
      ctx.fillText(formatNumber(canvasEndParameter), width - 25, y_point + 3);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.stroke();
      canvasBeginParameter = canvasEndParameter + 1;
      canvasEndParameter = canvasEndParameter + range;
    }
  };

  /**
   * this function will create the guide lines in vertical
   * @param {context} ctx
   * @param {*} width
   * @param {*} height
   */
  const drawGuideLines = (ctx, width, height) => {
    let x_point = (width - 60) / 10;
    const gap = x_point;
    for (let i = 0; i <= 10; i++) {
      x_point = i * gap;
      ctx.beginPath();
      ctx.setLineDash([5, 4]);
      ctx.moveTo(x_point + 30, 15);
      ctx.lineTo(x_point + 30, height - 15);
      ctx.strokeStyle = "#888";
      ctx.lineWidth;
      ctx.stroke();

      /** range */
      const text = 1000;
      ctx.fillStyle = "black";
      ctx.font = "8px serif";
      ctx.fillText("+ " + text * i, x_point + 15, 10);
      ctx.fillText("+ " + text * i, x_point + 15, height - 5);
    }
  };

  /**
   * Pass the parameters to create the rectangle
   * @param {context} ctx
   * @param {*} color
   * @param {*} strand
   * @param {*} xValue
   * @param {*} yValue
   * @param {*} rectWidth
   * @param {*} rectHeight
   */
  const createRectangleElement = (
    ctx,
    color,
    strand,
    xValue,
    yValue,
    rectWidth,
    rectHeight,
    label,
    id
  ) => {
    // Fill the rectangle with the specified color
    ctx.fillStyle = color;
    ctx.fillRect(
      xValue,
      strand === "+" ? yValue - rectHeight : yValue,
      rectWidth,
      rectHeight
    );

    // Set the border style
    ctx.strokeStyle = "black"; // Or any other color for the border
    ctx.lineWidth = 1; // Set the border thickness (1px in this case)

    // Draw the rectangle border
    ctx.strokeRect(
      xValue,
      strand === "+" ? yValue - rectHeight : yValue,
      rectWidth,
      rectHeight
    );

    // Store rectangle data for future use
    rectangles.current.push({
      x: xValue,
      y: strand === "+" ? yValue - rectHeight : yValue,
      width: rectWidth,
      height: rectHeight,
      label: label, // any additional data (e.g., label) for reference
      id: id, // add the id to the rectangles record to use it to create the list
    });
  };

  const createRectangleWithArrowElement = (
    ctx,
    color,
    strand,
    xValue,
    yValue,
    rectWidth,
    rectHeight,
    label,
    id
  ) => {
    // rectWidth=rectWidth-5;
    const arrowWidth = 50*scaleFactor;
  
    // Set fill color for the rectangle and arrow
    ctx.fillStyle = color;
  
    ctx.beginPath();
    if (strand === "+") {
      // Arrow points to the right, rectangle above the line
      ctx.moveTo(xValue, yValue - rectHeight);
      ctx.lineTo(xValue + rectWidth, yValue - rectHeight);
      ctx.lineTo(xValue + rectWidth + arrowWidth, yValue - rectHeight + rectHeight / 2);
      ctx.lineTo(xValue + rectWidth, yValue);
      ctx.lineTo(xValue, yValue);
    } else {
      // Arrow points to the left, rectangle below the line
      ctx.moveTo(xValue, yValue); // Start at the bottom left
      ctx.lineTo(xValue - arrowWidth, yValue + rectHeight / 2); // Arrowhead to the left
      ctx.lineTo(xValue, yValue + rectHeight); // Bottom right
      ctx.lineTo(xValue + rectWidth, yValue + rectHeight); // Top right corner of rectangle
      ctx.lineTo(xValue + rectWidth, yValue); // Top left corner of rectangle
    }
    ctx.closePath();
  
    // Fill and stroke the shape
    ctx.fill();
    ctx.strokeStyle= "#2F2F2F"
    ctx.stroke();
  
    // Store rectangle data for future use
    rectangles.current.push({
      x: xValue,
      y: strand === "+" ? yValue - rectHeight : yValue,
      width: rectWidth,
      height: rectHeight,
      label: label, // additional data (e.g., label) for reference
      id: id, // add the id to the rectangles record to use it to create the list
    });
  };
  

  /**
   * pass the parameters to create the font
   * @param {context} ctx
   * @param {*} text
   * @param {*} color
   * @param {*} strand
   * @param {*} xValue
   * @param {*} yValue
   * @param {*} fontStyle
   */
  const createTextForRectangle = (
    ctx,
    text,
    color,
    strand,
    xValue,
    yValue,
    fontStyle, width
  ) => {
    ctx.fillStyle = color;
    ctx.font = fontStyle;
    ctx.fillText(text, xValue-10+width/2, strand === "+" ? yValue - 7 : yValue + 12);
  };

  /**
   *
   * @param {context} ctx
   * @param {*} color
   * @param {*} elementStrand
   * @param {*} strand
   * @param {*} xValue
   * @param {*} yValue
   * @param {*} rectWidth
   * @param {*} rectHeight
   * @param {*} label
   * @param {*} id
   * @param {*} textColor
   * @param {*} fontStyle
   */
  const createBoxWithText = (
    ctx,
    color,
    elementStrand, // +,-
    strand, // +,-,both
    xValue,
    yValue,
    rectWidth,
    rectHeight,
    label,
    id,
    textColor,
    fontStyle
  ) => {
    if (strand !== "both") {
      if (strand === elementStrand) {
        createRectangleWithArrowElement(
          ctx,
          color,
          elementStrand,
          xValue,
          yValue,
          rectWidth,
          rectHeight,
          label,
          id
        );
        createTextForRectangle(
          ctx,
          label,
          textColor,
          elementStrand,
          xValue,
          yValue,
          fontStyle,rectWidth
        );
      }
    } else {
      createRectangleWithArrowElement(
        ctx,
        color,
        elementStrand,
        xValue,
        yValue,
        rectWidth,
        rectHeight,
        label,
        id
      );
      createTextForRectangle(
        ctx,
        label,
        textColor,
        elementStrand,
        xValue,
        yValue,
        fontStyle,rectWidth
      );
    }
  };

  /**
   * draw the data as rectangles
   * @param {context} ctx
   * @param {*} data
   * @param {*} rectHeight
   */
  const drawElement = (ctx, data, rectHeight, strand) => {
    let lineBeginParameter = pageBeginPoint;
    let lineEndParameter = pageBeginPoint + pageRange - 1;
    const fontStyle = "bold 9px Open Sans";
    
    //console.log("Starting Row :", row," Line Begin : ", lineBeginParameter," Line End : ", lineEndParameter,"New Y-coordinate : ", yValue);#00928D 
    const colorMap = {
      "CDS": {
        "+": "#14A5A0",
        "-": "#AAD8D7" //#97D7D5
      },
      "tRNA": {
        "+": "#89520B",
        "-": "#F39D2F"
      },
      "tmRNA": {
        "+": "#F8DEA7",
        "-": "#CFD8F7"
      },
      "rRNA": {
        "+": "#E0C07A",
        "-": "#F8DEA7"
      }
    };
    

    data?.forEach((element) => {
      const text = element.Gene===""?element.Label.slice(-4):element.Gene;
      const color = colorMap[element.Type][element.Strand];
      const fontColor = element.color!=="#02665E"?"black":"white";
      const elementEnd = element.End - 50;
      /** Update row and parameters if the element starts after the current range */
      if (element.Begin > lineEndParameter && elementEnd <= pageEndPoint) {
        row++;
        lineBeginParameter = lineEndParameter + 1;
        lineEndParameter = lineEndParameter + pageRange;
        yValue = gap * row;
        //console.log("New Row :", row," Line Begin : ", lineBeginParameter," Line End : ", lineEndParameter,"New Y-coordinate : ", yValue);
      }

      /**Create the rectangle from the previous rectangle */
      if (
        element.Begin <= lineBeginParameter &&
        elementEnd >= lineBeginParameter
      ) {
        // //console.log(
        //   "Previous Remaining Box : ",
        //   element.Begin,
        //   elementEnd,
        //   element.Label
        // );
        let Begin = lineBeginParameter;
        let End = elementEnd;
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
        element.Begin <= lineEndParameter &&
        elementEnd <= lineEndParameter
      ) {
        // //console.log(
        //   "Normal Box Line-Begin : ",
        //   lineBeginParameter," Line-End : ",
        //   lineEndParameter," Rect-Begin : ",
        //   element.Begin," Rect-End : ",
        //   elementEnd," Rect-Label : ",
        //   element.Label
        // );
        let rectWidth = elementEnd - element.Begin;
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
        elementEnd >= lineEndParameter
      ) {
        //console.log("Box on two lines starts here");
        // //console.log(
        //   "Box on current line Begin : ",
        //     element.Begin," End : ",
        //     elementEnd,"Label : ",
        //     element.Label
        // );
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
        if (elementEnd <= pageEndPoint) {
          row++;
          lineBeginParameter = lineEndParameter + 1;
          lineEndParameter = lineEndParameter + pageRange;
          yValue = gap * row;
          //console.log("New Row :", row," Line Begin : ", lineBeginParameter," Line End : ", lineEndParameter,"New Y-coordinate : ", yValue);
          // //console.log(
          //   "Remaining Box Begin : ",
          //   element.Begin," End : ",
          //   elementEnd,"Label : ",
          //   element.Label
          // );
          //console.log("Box on two lines ends here");
          //and create the remaining part here
          let remBegin = 30;
          let remEnd = elementEnd - lineBeginParameter - 1;
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

  const ref = useRef(null);

  useEffect(() => {
    //console.log(data);
    rectangles.current = []; // Reset the rectangles array
    const canvas = ref.current;
    if (!canvas) return; // If canvas is not yet available, exit early

    const context = canvas.getContext("2d");
    if (!context) return; // Ensure context is available

    // Clear the canvas before drawing
    context.clearRect(0, 0, width, height);

    // Draw the axis line and elements
    drawGuideLines(context, width, height);
    drawHorizontalLine(context, width, height, pageBeginPoint, pageEndPoint);
    drawElement(context, data, rectHeight, strand);

    // //console.log(rectangles);

    const handleRectClick = async (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      rectangles.current.forEach(async (rectangle) => {
        if (
          mouseX >= rectangle.x &&
          mouseX <= rectangle.x + rectangle.width &&
          mouseY >= rectangle.y &&
          mouseY <= rectangle.y + rectangle.height
        ) {
          // //console.log(`Rectangle with label ${rectangle.label} clicked!`);
          // //console.log(`Rectangle id is : ${rectangle.id}`);
          // Perform any action on click
          try {
            const dat = sessionStorage.getItem("dat");
            //code to fetch the data for the particular rectangle
            const url = serverGetTheGeneData + "/params?dat="+dat+"&gene_id=" + rectangle.id;

            const response = await fetch(url);
            if (response.status === 200) {
              const data = await response.json();
              //console.log(data);
              dispatch(setToggleDialogBox(true));
              dispatch(setDialogGeneData(data));
            }
          } catch (err) {
            //console.log("error_message : ", err.message);
          }
        }
      });
    };

    // Event listener for mouse move to change the cursor
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let hoveringOverRectangle = false;
      rectangles.current.forEach((rectangle) => {
        if (
          mouseX >= rectangle.x &&
          mouseX <= rectangle.x + rectangle.width &&
          mouseY >= rectangle.y &&
          mouseY <= rectangle.y + rectangle.height
        ) {
          hoveringOverRectangle = true;
        }
      });

      canvas.style.cursor = hoveringOverRectangle ? "pointer" : "default";
    };

    // Attach event listeners
    canvas.addEventListener("click", handleRectClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listeners on component unmount
    return () => {
      canvas.removeEventListener("click", handleRectClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data, rectHeight, width, height, slideBegin, slideEnd, strand]); // Make sure to add all depEndencies

  return ref;
};

export default useCanvas;
