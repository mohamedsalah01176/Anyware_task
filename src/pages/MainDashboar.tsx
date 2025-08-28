import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  // Grid,
  Chip,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Event as EventIcon,
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Grid } from "@mui/material";
import { theme } from '../util/theme';
import { useNavigate } from 'react-router';


function MainDashboar() {

  const nav=useNavigate();

  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 ,backgroundColor:theme.palette.secondary.light }}>
          <Typography variant="h4" gutterBottom sx={{color:theme.palette.primary.main}}>
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
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AnnouncementIcon sx={{ mr: 1 }} /> Announcements
            </Typography>
            
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#3f51b5', mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Mr Ahmed Mocash</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: Dec 15, 2023</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  Hi my hero(s) just want you ready to our exams and focus on remaining assessments as pain more grafias, good luck my warriors.
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#f50057', mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Mrs Salma Ahmed</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: Dec 14, 2023</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  Help my students, I want to announce that she met quite well in within 3 days and will cover the whole event. Add and subtract numbers. Study hard (good luck).
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                    <SchoolIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">School Management</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: Dec 13, 2023</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  Consciously consulted training. Warranty That gets ready-for-the-day old is fraud (such as coming by CEO Malcolm III, Cloakeya-Taker High School at TugimooK, Eight Unit, want me ready to get exams and focus on remaining assessments so pain more grafias, good luck my warriors).
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#ff9800', mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Events Manager</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: Dec 12, 2023</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  Wellness. Can't wait our upcoming trip so this next weekend. The trip will be to Dreamgain, and Plymouth & Us Brok won't eat please contact your close teacher.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>

            {/* Start Quiz Section */}
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <QuizIcon sx={{ mr: 1 }} /> Start Quiz
            </Typography>
            
            <Box sx={{display:"flex",alignItems:"start",gap:3,flexWrap:"wrap",justifyContent:"center"}}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AssignmentIcon color="secondary" sx={{ mr: 1 }} />
                    <Typography variant="h6">12-12 Assignment</Typography>
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Course: Article #12" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Topic: 5thth – 4thth July" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Due: 30 Dec 2023 - 09:00 PM" />
                    </ListItem>
                  </List>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>

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