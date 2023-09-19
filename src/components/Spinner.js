import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  return (
    <div style={{width: "100px", display: "block", margin: "auto"}}>
      <ClipLoader color="#000" size={50}/>
    </div>
  )
}
