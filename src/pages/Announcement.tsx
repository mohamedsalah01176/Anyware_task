// src/pages/Announcement.tsx
import React, { useState, useMemo, useEffect, useCallback } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store";
import { addAnnouncements, deleteAnnouncements, fetchAnnouncements, updateAnnouncements } from "../lib/slices/announcement";
import Loader from "../components/Loader/Loader";
import useTitle from "../customHook/PageTitle";
import useMetaDescription from "../customHook/PageDescription";
import UseMetaPageKeyWordsAndAuther from "../customHook/PageKeyWordsAndAuther";





const Announcement: React.FC = () => {
  useTitle("Announcements ");
  useMetaDescription("View the latest announcements from teachers in the Test System. Stay updated with important news and course-related information.");
  UseMetaPageKeyWordsAndAuther({
    keywords: "announcements, news, updates, teacher, student",
  });
  const {data,announcements,error,loading}=useSelector((state:RootState)=>state.announcement);
  const {decoded}=useSelector((state:RootState)=>state.users);
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<IAnnouncementItem | null >(null);
  const [announcementId,setAnnouncementId]=useState("")
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<{ title: string; body: string }>({title:"",body:""});
  const [body, setBody] = useState("");
  const [snack, setSnack] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  console.log(error)
  const dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(fetchAnnouncements())
  },[dispatch])
  console.log(announcements,"sssssssssssssssssssssssddddddddd")
  const filtered:IAnnouncementItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return announcements;
    return announcements.filter(
      (it:IAnnouncementItem) =>
        it.title.toLowerCase().includes(q) ||
        it.message.toLowerCase().includes(q) 
    );
  }, [announcements, query]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setTitle("");
    setBody("");
    setOpenDialog(true);
  },[]);

  const openEdit =useCallback( (it: IAnnouncementItem) => {
    setEditing(it);
    setTitle(it.title);
    setBody(it.message);
    setOpenDialog(true);
  },[]);
  
  const handleSave =useCallback( async() => {
    const newErrors: { title?: string; body?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!body.trim()) {
      newErrors.body = "Body is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    setErrors({title:"",body:""});
    if(editing){
      await dispatch(updateAnnouncements({payload:{title:title,message:body},announcementId}));
    }else{
      await dispatch(addAnnouncements({title:title,message:body}));
    }
    dispatch(fetchAnnouncements());
    console.log(data,"iddddddddddddd")
    setOpenDialog(false);
  },[dispatch,announcementId,body,title,data,editing]);
  
  const handleDelete = useCallback( async(id: string) => {
    await dispatch(deleteAnnouncements(id))
    dispatch(fetchAnnouncements());
  },[dispatch]);

  return (
    <Container  sx={{ py: 4 }}>
       {loading &&
        <Box sx={{position:"fixed" ,left:0,top:0,width:"100%",minHeight:"100%", background:theme.palette.secondary.main,display:"flex",justifyContent:"center",alignItems:"center",zIndex:"10"}}>
          <Loader/>
        </Box>
      }
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

        {decoded?.role === "teacher" &&
          <Fab
            color="primary"
            aria-label="add"
            onClick={openCreate}
            size="medium"
            sx={{ ml: { xs: 0, sm: 1,"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main} } }}
          >
            <AddIcon />
          </Fab>
        }
      </Box>

      <Grid container spacing={3}>

        {filtered.length>0?
          filtered.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id} sx={{width:"100%"}}>
              <AnnoincementCard handleDelete={handleDelete} openEdit={openEdit} item={item} setAnnouncementId={setAnnouncementId}/>
            </Grid>
          ))
        :
          <Typography variant="body1" color="textSecondary" mx={"auto"}>
            No announcements found.
          </Typography>
        }
      </Grid>

      {/* Dialog: Create / Edit */}
      <UpdateAnnouncment openDialog={openDialog} setOpenDialog={setOpenDialog} editing={editing} handleSave={handleSave} title={title} setTitle={setTitle} body={body} setBody={setBody} errors={errors}/>

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
