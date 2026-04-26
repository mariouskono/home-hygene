import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const filePath = path.join(process.cwd(), "data", "orders.json");
    
    if (!fs.existsSync(filePath)) return NextResponse.json({ message: "Database not found" }, { status: 404 });
    
    let orders = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const orderIndex = orders.findIndex((o: any) => o.orderId === id);
    
    if (orderIndex === -1) return NextResponse.json({ message: "Order not found" }, { status: 404 });
    
    orders[orderIndex] = { ...orders[orderIndex], ...body };
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
    
    return NextResponse.json({ message: "Order updated successfully", order: orders[orderIndex] });
  } catch (error) {
    return NextResponse.json({ message: "Error updating order" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), "data", "orders.json");
    
    if (!fs.existsSync(filePath)) return NextResponse.json({ message: "Database not found" }, { status: 404 });
    
    let orders = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const filteredOrders = orders.filter((o: any) => o.orderId !== id);
    
    if (filteredOrders.length === orders.length) return NextResponse.json({ message: "Order not found" }, { status: 404 });
    
    fs.writeFileSync(filePath, JSON.stringify(filteredOrders, null, 2));
    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting order" }, { status: 500 });
  }
}
