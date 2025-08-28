// src/pages/Announcement.tsx
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import type { IAnnouncementItem } from "../interfaces/annoucement";
import { theme } from "../util/theme";


interface IProps {
  openDialog: boolean;
  setOpenDialog: (val: boolean) => void;
  editing: IAnnouncementItem | null;
  handleSave: () => void;
  title: string;
  setTitle: (val: string) => void;
  body: string;
  setBody: (val: string) => void;
}

const UpdateAnnouncment = ({openDialog,setOpenDialog,editing,handleSave,title,setTitle,body,setBody}:IProps) => {


    
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Announcement" : "New Announcement"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Body"
            fullWidth
            multiline
            minRows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* <TextField
            label="Author"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" sx={{"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main}}} onClick={handleSave}>
            {editing ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default UpdateAnnouncment