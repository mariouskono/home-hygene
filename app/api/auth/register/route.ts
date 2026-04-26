import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const filePath = path.join(process.cwd(), "data", "users.json");
    let users = [];

    if (fs.existsSync(filePath)) {
      const usersData = fs.readFileSync(filePath, "utf8");
      users = JSON.parse(usersData);
    }

    // Check if user already exists
    if (users.find((u: any) => u.username === username)) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }

    // Add new user as pelanggan
    const newUser = {
      username,
      password,
      role: "pelanggan",
    };

    users.push(newUser);

    // Save
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ role: newUser.role });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
