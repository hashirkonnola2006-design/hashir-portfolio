import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const VISITS_FILE = path.join(DATA_DIR, "visits.json");

async function getVisits() {
  try {
    const data = await fs.readFile(VISITS_FILE, "utf-8");
    const json = JSON.parse(data);
    return json.count || 0;
  } catch {
    return 0;
  }
}

async function saveVisits(count) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(VISITS_FILE, JSON.stringify({ count }, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save visitor count:", error);
  }
}

export async function GET() {
  const count = await getVisits();
  return NextResponse.json({ count });
}

export async function POST() {
  let count = await getVisits();
  count += 1;
  await saveVisits(count);
  return NextResponse.json({ count });
}
