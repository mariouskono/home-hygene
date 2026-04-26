import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    const filePath = path.join(process.cwd(), "data", "orders.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const data = fs.readFileSync(filePath, "utf8");
    let orders = JSON.parse(data);

    // Filter by username if provided (user-specific view)
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    if (username) {
      orders = orders.filter((o: any) => o.username === username);
    }

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: "Error reading orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    const filePath = path.join(process.cwd(), "data", "orders.json");
    let orders = [];

    if (fs.existsSync(filePath)) {
      orders = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...orderData
    };

    orders.push(newOrder);

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    return NextResponse.json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    return NextResponse.json({ message: "Error saving order" }, { status: 500 });
  }
}
