import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { wallet, message, signature } = req.body;
    const walletPublicKey = new PublicKey(wallet);

    const isVerified = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      Uint8Array.from(Buffer.from(signature, 'base64')),
      walletPublicKey.toBytes()
    );

    if (!isVerified) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    let user = await prisma.user.findUnique({ where: { wallet } });
    if (!user) {
      user = await prisma.user.create({ data: { wallet } });
    }

    res.json({ user });
  } else {
    res.status(405).end();
  }
};
