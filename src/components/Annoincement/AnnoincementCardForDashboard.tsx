import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Person as PersonIcon
} from '@mui/icons-material';
import type { IAnnouncementItem } from '../../interfaces/annoucement';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificUser } from '../../lib/slices/user';
import type { AppDispatch, RootState } from '../../lib/store';

interface IProps{
  item:IAnnouncementItem,

}

const AnnoincementCardForDashboard = ({item}:IProps) => {
  const {user}=useSelector((state:RootState)=>state.users)
  const dispatch=useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchSpecificUser(item.createdBy as string))
  },[item.createdBy]);
  console.log(user,"lllll");
  return (
    <Card elevation={3} sx={{ mb: 3 ,width:"100%"}}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#3f51b5', mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="body2" color="textSecondary">Posted: {item.createdAt}</Typography>
          </Box>
        </Box>
        <Typography variant="body1" paragraph>
          {item.message}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AnnoincementCardForDashboard