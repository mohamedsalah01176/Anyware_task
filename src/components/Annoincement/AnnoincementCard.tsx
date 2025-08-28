// src/pages/Announcement.tsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,

  Avatar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import type { IAnnouncementItem } from "../../interfaces/annoucement";

interface IProps{
  item:IAnnouncementItem,
  openEdit:(item:IAnnouncementItem)=>void;
  handleDelete:(id:string)=>void;

}

const AnnoincementCard = ({item,openEdit,handleDelete}:IProps) => {
  return (
    <Card sx={{ height: "100%",width:"100%", display: "flex", flexDirection: "column" }} elevation={3}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>{item.createdBy?.[0] ?? "A"}</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {item.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.createdBy ?? "Unknown"} • {item.createdAt}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {item.message.length > 180 ? item.message.slice(0, 180) + "…" : item.message}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton
          size="small"
          onClick={() => openEdit(item)}
          aria-label="edit"
          color="inherit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDelete(item._id)}
          aria-label="delete"
          color="inherit"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default AnnoincementCard