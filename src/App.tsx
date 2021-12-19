import "./styles.css";
import { useFadeBetween } from "./useFadeBetween";
export default function App() {
  const markers = [
    { color: "red", text: "1" },
    { color: "green", text: "2" },
    { color: "yellow", text: "3" },
    { color: "purple", text: "4" },
    // works for any number of items
    // { color: "magenta", text: "5" },
    // { color: "brown", text: "6" },
    // { color: "violet", text: "7" },
    // { color: "orange", text: "8" },
  ];

  const getFadeProps = useFadeBetween(markers.length);

  return (
    <div className="App">
      {markers.map((marker, index) => {
        const fadeProps = getFadeProps(index);
        return (
          <div
            key={marker.text}
            className={`box ${fadeProps.className}`}
            style={{ backgroundColor: marker.color, ...fadeProps.style }}
          >
            {marker.text}
          </div>
        );
      })}
    </div>
  );
}
