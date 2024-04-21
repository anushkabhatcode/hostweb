SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[getmoodstats]  
    @username VARCHAR(MAX)
AS
BEGIN
    DECLARE @desiredmood VARCHAR(MAX);
    DECLARE @currentmood VARCHAR(MAX);

    WITH CurrentMoodsData AS (
        SELECT
            COUNT(*) AS mood_count,
            M.Mood AS Mood
        FROM
            CurrentMoods CM
        INNER JOIN
            Moods M ON M.id = CM.MoodId
        WHERE
            username = @username
        GROUP BY
            M.Mood
    ),
    DesiredMoodsData AS (
        SELECT
            COUNT(*) AS mood_count,
            M.Mood AS Mood
        FROM
            DesiredMoods CM
        INNER JOIN
            Moods M ON M.id = CM.MoodId
        WHERE
            username = @username
        GROUP BY
            M.Mood
    )
    SELECT
        (
            SELECT
                mood_count,
                Mood
            FROM
                CurrentMoodsData
            FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
        ) AS current_moods,
        (
            SELECT
                mood_count,
                Mood
            FROM
                DesiredMoodsData
            FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
        ) AS desired_moods
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER;
END
GO
