SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[getRecommendations] @sessionID varchar(max), @username varchar(max) 

AS
  

  declare @desiredmood varchar(max)
  declare @desiredmood_2 varchar(max)
  declare @currentmood varchar(max)
  declare @activity varchar(max)
  declare @note varchar(max)
  declare @createddate date
  declare @moodID int 
  --declare @username varchar(max) = 'Keerthana123'
  --declare @sessionID varchar(max) = 'D2FB-212C-E095'

  select @desiredmood = Mood from moods M inner join desiredMoods dm on M.ID=dm.MoodId where username = @username and sessionID =@sessionID
  
  select @currentmood = Mood from moods M inner join CurrentMoods cm on M.ID=cm.MoodId where username = @username and sessionID =@sessionID




  if (@desiredmood is null and @currentmood is null)
  BEGIN

  Select @moodID=moodId from ( 
  select row_number () over (order by createdAt desc) as row_num,dm.MoodId from
  desiredMoods dm where username = @username ) A where row_num=2

  Select @desiredmood=Mood from moods M where M.id=@moodID

  Select @note=note from ( 
  select row_number () over (order by createdAt desc) as row_num,dm.note from
  userActivities dm where username = @username ) A where row_num=2
   

  End


  select @activity = activity, @note = note  from userActivities where username = @username and sessionID =@sessionID

  IF CHARINDEX('sad', @note) > 0 OR CHARINDEX('unhappy', @note) > 0 OR CHARINDEX('not happy', @note) > 0 OR CHARINDEX('not good', @note) > 0
    Select @desiredmood_2 = 'Happy'
ELSE IF CHARINDEX('angry', @note) > 0 OR CHARINDEX('mad', @note) > 0 OR CHARINDEX('Irritable', @note) > 0 or CHARINDEX('fear', @note) > 0 OR CHARINDEX('scared', @note) > 0
    Select @desiredmood_2 = 'Relaxed'
ELSE IF CHARINDEX('alone',@note)>0 OR CHARINDEX('lonely',@note)>0 or CHARINDEX('loneliness',@note)>0
    Select @desiredmood_2 = 'Connection'
ELSE IF CHARINDEX('disgust',  @note) > 0 OR CHARINDEX('disgusted', @note) > 0
    Select @desiredmood_2 = 'Grateful'

  select name,Image_name, 'Movies' as category, description, Null as author,Null as Link from Movies M inner join Moods mood on M.MoodID=mood.id
  where mood.Mood=@desiredmood
  union 
  select quotes,'','Quotes' as category,Null as description,author ,Null as Link from quotes q inner join Moods mood on q.MoodId =mood.id
  where mood.Mood = @desiredmood
  union 
  select name,Image_name,'Books' as category,Null as description, author,Null as Link from Books B inner join Moods mood on B.MoodID = mood.id
  where mood.Mood = @desiredmood
  UNION
  Select name, Image_name, 'Vacation' as category, description,Null as author,  Link from VacationSpots v inner join Moods mood on v.MoodID = mood.id
  where mood.Mood = @desiredmood
  UNION
  select name,Image_name, 'Movies' as category, description, Null as author,Null as Link from Movies M inner join Moods mood on M.MoodID=mood.id
  where mood.Mood=@desiredmood_2
  union 
  select quotes,'','Quotes' as category,Null as description,author,Null as Link from quotes q inner join Moods mood on q.MoodId =mood.id
  where mood.Mood = @desiredmood_2
  union 
  select name,Image_name,'Books' as category,Null as description, author, Null as Link from Books B inner join Moods mood on B.MoodID = mood.id
  where mood.Mood = @desiredmood_2
  UNION
  Select name, Image_name, 'Vacation' as category, Null as description,Null as author,Link from VacationSpots v inner join Moods mood on v.MoodID = mood.id
  where mood.Mood = @desiredmood_2
GO
