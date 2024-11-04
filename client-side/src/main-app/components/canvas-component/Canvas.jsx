import useCanvas from "./custom-hook/useCanvas.js";

const Canvas = (props) => {
  //...rest is the props thing that have the rest of the props other than we have used here
  const { width, height, style } = props;
  const ref = useCanvas(props);
  return (
    <canvas
      width={parseInt(width, 10)} // Convert to number
      height={parseInt(height, 10)} // Convert to number
      style={style}
      ref={ref}
    />
  );
};

export default Canvas;
