import Fab from "@mui/material/Fab"
import AddIcon from "@mui/icons-material/Add"

function FabButton() {
  const fabStyle = {
    position: "fixed",
    bottom: 70,
    right: 16,
    backgroundColor: "#ffab00",
  }

  return (
    <div>
      <Fab color="primary" aria-label="add" sx={fabStyle}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default FabButton
