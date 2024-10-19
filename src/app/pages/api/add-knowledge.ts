import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define the response type for your handler
type Data = {
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { statement, source, image } = req.body;

  const data = {
    class: "KnowledgeEntry",
    properties: {
      statement: statement,
      source: source,
      image: image,  // Store base64-encoded image
      timestamp: new Date().toISOString(),
    },
  };

  try {
    
    await axios.post(`${process.env.WEAVIATE_HOST}/v1/objects`, data);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
