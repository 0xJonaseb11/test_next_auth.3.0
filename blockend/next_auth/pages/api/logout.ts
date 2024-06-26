import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Invalidate session or token here
    res.status(200).end();
  } else {
    res.status(405).end();
  }
};
