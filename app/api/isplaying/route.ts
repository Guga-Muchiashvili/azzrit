// // pages/api/isplaying.ts
// import { isUserPlaying } from '@/actions/fetchData/dataRequests';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { userId } = req.body;
  
//     if (!userId) {
//       return res.status(400).json({ error: 'User ID is required' });
//     }
  
//     try {
//       const isPlaying = await isUserPlaying(userId);
//       return res.status(200).json({ isPlaying });
//     } catch (error) {
//       console.error('API error:', error);
//       return res.status(500).json({ error: 'Error checking if user is playing' });
//     }
//   }