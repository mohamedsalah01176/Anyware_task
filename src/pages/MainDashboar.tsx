import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Quiz as QuizIcon,
  Announcement as AnnouncementIcon,
} from '@mui/icons-material';
import { Grid } from "@mui/material";
import { theme } from '../util/theme';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../lib/store';
import { useEffect } from 'react';
import { fetchAnnouncements } from '../lib/slices/announcement';
import AnnoincementCardForDashboard from '../components/Annoincement/AnnoincementCardForDashboard';
import useTitle from '../customHook/PageTitle';
import useMetaDescription from '../customHook/PageDescription';
import UseMetaPageKeyWordsAndAuther from '../customHook/PageKeyWordsAndAuther';


function MainDashboar() {
  useTitle("Dashboard ");
  useMetaDescription("Main dashboard of the Test System. Teachers and students can access exams, courses, and announcements relevant to their account.");
  UseMetaPageKeyWordsAndAuther({
    keywords: "dashboard, exams, courses, teacher, student",
  });
  const nav=useNavigate();
  const {announcements}=useSelector((state:RootState)=>state.announcement);
  const dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(fetchAnnouncements())
  },[dispatch])
  console.log(announcements)
  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 ,backgroundColor:theme.palette.secondary.light }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{color:theme.palette.primary.main}}>
            EXAMS TIME
          </Typography>
          <Typography variant="h6" paragraph>
            Here we are. Are you ready to fight? Don't worry, we prepared some tips to be ready for your exams.
          </Typography>
          <Button onClick={()=>nav("/quizzes")} variant="contained" sx={{ backgroundColor: theme.palette.primary.main , color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>
            View Exams Tips
          </Button>
        </Paper>

        <Grid container spacing={4}>
          {/* Left Column - Announcements */}
          <Grid item xs={12} md={8} width={"100%"}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AnnouncementIcon sx={{ mr: 1 }} /> Announcements
            </Typography>
            {announcements?.length>0?
              announcements?.map((item)=>{
                return(
                <AnnoincementCardForDashboard item={item} />
                )
              }) 
              :
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center", mt: 3 }}
              >
                No announcements available.
              </Typography>
            }

          </Grid>

          <Grid item width={"100%"}>

            {/* Start Quiz Section */}
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <QuizIcon sx={{ mr: 1 }} /> Tips
            </Typography>
            
            <Box sx={{display:"flex",alignItems:"start",gap:3,flexWrap:"wrap",justifyContent:"center",width:"100%"}}>

              <Accordion elevation={3}  sx={{ margin: "0 !important",}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Exam Preparation Tips</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph sx={{ marginBottom: 0 }}>
                    • Create a study schedule and stick to it
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Take regular breaks during study sessions
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Practice with past exam papers
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Get plenty of rest before the exam
                  </Typography>
                  <Typography variant="body2">
                    • Stay hydrated and eat healthy meals
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Container>
  );
}

export default MainDashboar;