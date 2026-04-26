import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const filePath = path.join(process.cwd(), "data", "users.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const usersData = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(usersData);

    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (user) {
      return NextResponse.json({ role: user.role });
    } else {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
