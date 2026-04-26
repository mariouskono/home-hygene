import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "users.json");
    if (!fs.existsSync(filePath)) return NextResponse.json([]);
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Error reading users" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "data", "users.json");
    
    if (!fs.existsSync(filePath)) return NextResponse.json({ message: "Database not found" }, { status: 404 });
    
    let users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    // Since we don't have true auth, we identify by username
    const userIndex = users.findIndex((u: any) => u.username === body.username);
    
    if (userIndex === -1) return NextResponse.json({ message: "User not found" }, { status: 404 });
    
    users[userIndex] = { ...users[userIndex], ...body.data };
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    
    return NextResponse.json({ message: "Profile updated successfully", user: users[userIndex] });
  } catch (error) {
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}
