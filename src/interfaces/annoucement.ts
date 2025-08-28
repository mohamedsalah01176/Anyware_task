export interface IAnnouncementItem {
  _id: string;
  title: string;         
  titleEn?: string;     
  titleAr?: string;     
  message: string;       
  messageEn?: string;  
  messageAr?: string;    
  createdBy?: string; 
  expiresAt?: Date;  
  createdAt?: string;
  updatedAt?: Date;
}