import AppBar from "../AppBar/AppBar.jsx";

export default function Header() {
  return (
    <div
      style={{
        backgroundColor: "yellow",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1>svg</h1>
        <h1>LOGO </h1>
      </div>
      <AppBar></AppBar>
    </div>
  );
}
