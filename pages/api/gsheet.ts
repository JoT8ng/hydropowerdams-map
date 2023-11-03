import type { NextApiRequest, NextApiResponse } from "next";

const { GSHEET_API } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Request method not supported" });
  }

  try {
    const response = await fetch(GSHEET_API as string);
    const data = await response.json();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Error fetching data." });
  }
}
