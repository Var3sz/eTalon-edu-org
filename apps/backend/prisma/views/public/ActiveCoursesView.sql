SELECT
  c.id,
  c."courseId",
  g.description AS "groupDescription",
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
  c.headcount,
  c."maxHeadCount",
  p.price,
  c."startDate",
  c."startTime",
  c."endTime",
  c.active,
  c.locked
FROM
  (
    (
      (
        (
          "Course" c
          LEFT JOIN "Group" g ON ((c."groupId" = g.id))
        )
        LEFT JOIN "Location" l ON ((c."locationId" = l.id))
      )
      LEFT JOIN "Course_Package" cp ON ((cp."courseId" = c.id))
    )
    LEFT JOIN "Package" p ON (((p."packageId") :: text = (cp."packageId") :: text))
  )
WHERE
  (c.active = TRUE);