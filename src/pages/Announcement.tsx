// src/pages/Announcement.tsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Fab,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import UpdateAnnouncment from "../components/UpdateAnnouncment";
import type { IAnnouncementItem } from "../interfaces/annoucement";
import AnnoincementCard from "../components/Annoincement/AnnoincementCard";
import { theme } from "../util/theme";



const initialAnnouncements: IAnnouncementItem[] = [
  {
    _id: "a1",
    title: "Exam Schedule Released",
    message: "Final exam schedule is now published. Check the calendar and your course page.",
    createdAt: "2024-12-01",
  },
  {
    _id: "a2",
    title: "Library Hours Update",
    message: "Library will be open 9am–6pm during the exam week.",
    createdAt: "2024-11-28",
  },
  {
    _id: "a3",
    title: "New Course: Advanced React",
    message: "Enrollment opens next Monday. Seats are limited — register early!",
    createdAt: "2024-11-20",
  },
];

const Announcement: React.FC = () => {
  const [items, setItems] = useState<IAnnouncementItem[]>(initialAnnouncements);
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<IAnnouncementItem | null >(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [snack, setSnack] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.message.toLowerCase().includes(q) 
    );
  }, [items, query]);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setBody("");
    setOpenDialog(true);
  };

  const openEdit = (it: IAnnouncementItem) => {
    setEditing(it);
    setTitle(it.title);
    setBody(it.message);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      setSnack({ open: true, message: "Please provide title and body." });
      return;
    }


    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    console.log(id)
  };

  return (
    <Container  sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Announcements
        </Typography>

        <TextField
          placeholder="Search announcements..."
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Fab
          color="primary"
          aria-label="add"
          onClick={openCreate}
          size="medium"
          sx={{ ml: { xs: 0, sm: 1,"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main} } }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">No announcements found.</Typography>
          </Grid>
        )}

        {filtered.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id} sx={{width:"100%"}}>
            <AnnoincementCard handleDelete={handleDelete} openEdit={openEdit} item={item}/>
          </Grid>
        ))}
      </Grid>

      {/* Dialog: Create / Edit */}
      <UpdateAnnouncment openDialog={openDialog} setOpenDialog={setOpenDialog} editing={editing} handleSave={handleSave} title={title} setTitle={setTitle} body={body} setBody={setBody}/>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ open: false, message: "" })}
        message={snack.message}
      />
    </Container>
  );
};

export default Announcement;
