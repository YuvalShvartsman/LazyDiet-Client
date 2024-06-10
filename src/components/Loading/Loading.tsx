import "./Loading.css";
import LoadingGIF from "/loadingAvocado.gif";

function Loading() {
  return (
    <div className="Loading-Box">
      <img src={LoadingGIF} className="Loading" />
    </div>
  );
}

export default Loading;
