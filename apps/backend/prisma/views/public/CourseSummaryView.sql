SELECT
  c.id,
  c."courseId",
  g.description AS "groupDescription",
  (
    round(
      CASE
        WHEN (c."maxHeadcount" > 0) THEN (
          (
            (c.headcount) :: numeric / (c."maxHeadcount") :: numeric
          ) * (100) :: numeric
        )
        ELSE (0) :: numeric
      END
    )
  ) :: integer AS occupancy,
  (
    (
      (
        (
          (
            (
              (
                (c.description || ', ' :: text) || to_char(c."startDate", 'YYYY-MM-DD' :: text)
              ) || ', ' :: text
            ) || c."startTime"
          ) || '-' :: text
        ) || c."endTime"
      ) || ', ' :: text
    ) || l.description
  ) AS description,
  c.headcount,
  c."maxHeadcount",
  c.price,
  c."startDate",
  c."startTime",
  c."endTime",
  c.active,
  c.locked
FROM
  (
    (
      "Course" c
      LEFT JOIN "Group" g ON ((c."groupId" = g.id))
    )
    LEFT JOIN "Location" l ON ((c."locationId" = l.id))
  );