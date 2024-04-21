SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Select * from CurrentMoods

--exec [dbo].[getStats] 'D2FB-212C-E095','Keerthana123'

ALTER PROCEDURE [dbo].[getStats] @sessionID varchar(max), @username varchar(max) 

AS

Begin

declare @populardesiredmood varchar(max)
declare @activity varchar(max)
declare @note varchar(max)
declare @moodbooststreak int
declare @popularActivity varchar(max)
declare @popularActivitiesFreq int
declare @popularCurrentmood varchar(max)
  

select @activity = activity, @note = note  from userActivities where username = @username and sessionID =@sessionID;

with CTE as (
    Select mood , row_number () over (order by cnt desc) as row_num from (
    SELECT  Mood, count(*) as cnt
    FROM moods M
    INNER JOIN desiredMoods dm ON M.ID = dm.MoodId
    WHERE username = @username 
    group by mood

    ) As Sub

) select @populardesiredmood=mood from CTE where row_num=1;

Select @moodbooststreak=count(*) from CurrentMoods where username=@username


Select @popularActivity=STRING_AGG(Activity,',') from (
Select ROW_NUMBER() OVER (order by cnt desc) as row_num,activity,cnt  from  (
select count(*) as cnt ,activity from UserActivities
where username= @username
group by activity
) Sub
) A where A.row_num <4;


Select @popularActivitiesFreq=sum(cnt) from (
Select ROW_NUMBER() OVER (order by cnt desc) as row_num,activity,cnt  from  (
select count(*) as cnt ,activity from UserActivities
where username= @username
group by activity
) Sub
) A where A.row_num =1;

with CTE as (
    Select mood , row_number () over (order by cnt desc) as row_num from (
    SELECT  Mood, count(*) as cnt
    FROM moods M
    INNER JOIN CurrentMoods dm ON M.ID = dm.MoodId
    WHERE username = @username 
    group by mood

    ) As Sub

) select @popularCurrentmood=mood from CTE where row_num=1;

Drop table if exists #temp;
with CTE as (
    Select mood , row_number () over (partition by username order by cnt desc) as row_num,username,cnt from (
    SELECT  Mood, count(*) as cnt,username
    FROM moods M
    INNER JOIN CurrentMoods dm ON M.ID = dm.MoodId
    --WHERE username = @username AND sessionID = @sessionID
    group by mood,username

    ) As Sub

) select *  into #temp from CTE where row_num=1;

--Select username from #temp where mood =@popularCurrentmood

Drop table if exists #temp_des;

with CTE as (
    Select mood , row_number () over (partition by username order by cnt desc) as row_num,username,cnt from (
    SELECT  Mood, count(*) as cnt,username
    FROM moods M
    INNER JOIN DesiredMoods dm ON M.ID = dm.MoodId
    --WHERE username = @username AND sessionID = @sessionID
    group by mood,username

    ) As Sub

) select *  into #temp_des from CTE where row_num=1;

drop table if exists #temp_act;
Select Activity as popular_activity,username into #temp_act from (
Select ROW_NUMBER() OVER (partition by username order by cnt desc) as row_num,activity,cnt,username  from  (
select count(*) as cnt ,activity,username from UserActivities
group by activity,username
) Sub
) A where A.row_num =1;
DECLARE @usernames_json NVARCHAR(MAX);
DECLARE @additional_data_json NVARCHAR(MAX);

SELECT @usernames_json = (
    SELECT username
    FROM (
        SELECT username FROM #temp WHERE mood = @popularCurrentmood
        UNION 
        SELECT username FROM #temp_act WHERE @popularActivity LIKE '%' + popular_activity + '%'
        UNION 
        SELECT username FROM #temp_des WHERE mood = @populardesiredmood
    ) AS A
    FOR JSON PATH
);

SELECT @additional_data_json = (
    SELECT
        IsNull(@moodbooststreak,0) AS moodbooststreak,
        IsNull(@popularActivitiesFreq,0) AS popularActivitiesFreq,
        Isnull(@populardesiredmood,'None recorded') AS populardesiredmood,
        Isnull(@popularActivity,'') As popularActivity

    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
);



SELECT 
    CONCAT('{ "usernames": ', Isnull(@usernames_json,'"None recorded"'), ', "additional_data": ', @additional_data_json, ' }') AS combined_json;



 
End

GO
