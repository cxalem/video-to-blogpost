import { NextApiHandler } from "next";
import ytdl from "ytdl-core";

const handler: NextApiHandler = async (req, res) => {
  const { url } = req.query;
  try {
    const info = await ytdl.getInfo(url as string);
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
    });
    const audio = ytdl(url as string, { format });
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${info.videoDetails.title}.mp4"`
    );
    res.setHeader("Content-Type", "video/mpeg");
    audio.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ text: "error" });
  }
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default handler;
