import "../App.css";

export function Marker({ isOn }: { isOn: boolean }) {
  return <div className={"marker " + (isOn ? "on" : "off")}></div>;
}
