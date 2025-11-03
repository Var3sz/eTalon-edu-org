SELECT
  c.id,
  c."courseId",
  g.description AS "groupDescription",
  l.description AS "locationDescription",
  (
    round(
      CASE
        WHEN (c."maxHeadCount" > 0) THEN (
          (
            (c.headcount) :: numeric / (c."maxHeadCount") :: numeric
          ) * (100) :: numeric
        )
        ELSE (0) :: numeric
      END
    )
  ) :: integer AS occupancy,
  NULL :: text AS price,
  c.headcount,
  c."maxHeadCount",
  (
    (
      (
        (
          (
            (
              (
                ((c.description) :: text || ', ' :: text) || to_char(c."startDate", 'YYYY-MM-DD' :: text)
              ) || ', ' :: text
            ) || (c."startTime") :: text
          ) || '-' :: text
        ) || (c."endTime") :: text
      ) || ', ' :: text
    ) || (l.description) :: text
  ) AS description,
  c.locked,
  c."startDate",
  c."startTime",
  c."endTime",
  c.active
FROM
  (
    (
      "Course" c
      LEFT JOIN "Group" g ON ((c."groupId" = g.id))
    )
    LEFT JOIN "Location" l ON ((c."locationId" = l.id))
  )
WHERE
  (c.active = TRUE);