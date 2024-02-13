import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import prompts from '../data/prompts.json';


export function GET(req: Request) {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[randomIndex];
  return new Response(JSON.stringify({ prompt }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
